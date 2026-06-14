from __future__ import annotations

import base64
import time
from dataclasses import dataclass
from io import BytesIO

import cv2
import numpy as np
from PIL import Image, ImageOps

from .models import get_optional_models
from .schemas import ProcessRequest, ProcessedPhoto
from .settings import settings


@dataclass
class ProcessOutput:
    photo: ProcessedPhoto


def decode_image(image_bytes: bytes) -> np.ndarray:
    image = Image.open(BytesIO(image_bytes))
    image = ImageOps.exif_transpose(image).convert("RGB")
    rgb = np.array(image)
    return cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)


def limit_size(bgr: np.ndarray) -> np.ndarray:
    height, width = bgr.shape[:2]
    longest = max(height, width)
    if longest <= settings.max_edge:
        return bgr
    scale = settings.max_edge / float(longest)
    next_size = (max(1, int(width * scale)), max(1, int(height * scale)))
    return cv2.resize(bgr, next_size, interpolation=cv2.INTER_AREA)


def encode_jpeg(bgr: np.ndarray) -> tuple[str, int, int]:
    height, width = bgr.shape[:2]
    ok, buffer = cv2.imencode(
        ".jpg",
        bgr,
        [int(cv2.IMWRITE_JPEG_QUALITY), int(settings.jpeg_quality)],
    )
    if not ok:
        raise RuntimeError("JPEG_ENCODE_FAILED")
    return base64.b64encode(buffer.tobytes()).decode("ascii"), width, height


def gray_world_white_balance(bgr: np.ndarray) -> np.ndarray:
    image = bgr.astype(np.float32)
    avg = image.reshape(-1, 3).mean(axis=0)
    gray = avg.mean()
    scale = gray / np.maximum(avg, 1.0)
    balanced = image * scale
    return np.clip(balanced, 0, 255).astype(np.uint8)


def apply_clahe_luminance(bgr: np.ndarray, clip_limit: float = 1.8) -> np.ndarray:
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB)
    l_channel, a_channel, b_channel = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=(8, 8))
    l_channel = clahe.apply(l_channel)
    merged = cv2.merge((l_channel, a_channel, b_channel))
    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)


def unsharp_mask(bgr: np.ndarray, amount: float = 0.55, radius: int = 3) -> np.ndarray:
    blurred = cv2.GaussianBlur(bgr, (0, 0), radius)
    sharpened = cv2.addWeighted(bgr, 1 + amount, blurred, -amount, 0)
    return np.clip(sharpened, 0, 255).astype(np.uint8)


def skin_mask(bgr: np.ndarray) -> np.ndarray:
    ycrcb = cv2.cvtColor(bgr, cv2.COLOR_BGR2YCrCb)
    lower = np.array([0, 135, 85], dtype=np.uint8)
    upper = np.array([255, 180, 135], dtype=np.uint8)
    mask = cv2.inRange(ycrcb, lower, upper)
    mask = cv2.medianBlur(mask, 5)
    mask = cv2.GaussianBlur(mask, (0, 0), 5)
    return mask.astype(np.float32) / 255.0


def natural_skin_smoothing(bgr: np.ndarray, strength: float) -> np.ndarray:
    if strength <= 0:
        return bgr
    smooth = cv2.bilateralFilter(bgr, d=9, sigmaColor=55, sigmaSpace=55)
    detail = cv2.addWeighted(bgr, 1.18, smooth, -0.18, 0)
    blended = cv2.addWeighted(smooth, strength, detail, 1 - strength, 0)
    mask = skin_mask(bgr)[..., None]
    output = bgr.astype(np.float32) * (1 - mask * strength) + blended.astype(np.float32) * (mask * strength)
    return np.clip(output, 0, 255).astype(np.uint8)


def add_vignette(bgr: np.ndarray, strength: float) -> np.ndarray:
    if strength <= 0:
        return bgr
    height, width = bgr.shape[:2]
    x_kernel = cv2.getGaussianKernel(width, width * 0.55)
    y_kernel = cv2.getGaussianKernel(height, height * 0.55)
    kernel = y_kernel @ x_kernel.T
    mask = kernel / kernel.max()
    mask = 1 - strength + strength * mask
    output = bgr.astype(np.float32) * mask[..., None]
    return np.clip(output, 0, 255).astype(np.uint8)


def add_grain(bgr: np.ndarray, amount: float) -> np.ndarray:
    if amount <= 0:
        return bgr
    noise = np.random.normal(0, amount * 18, bgr.shape).astype(np.float32)
    output = bgr.astype(np.float32) + noise
    return np.clip(output, 0, 255).astype(np.uint8)


def color_grade(bgr: np.ndarray, effect_id: str, intensity: float) -> np.ndarray:
    image = bgr.astype(np.float32)
    if effect_id == "natural":
        image = image * (1.0 + 0.04 * intensity)
    elif effect_id == "minguo-film":
        # A polished Republic-era portrait look: clear skin, restrained warmth,
        # soft highlights, and no heavy yellow "old photo" cast.
        source = np.clip(image, 0, 255).astype(np.uint8)
        lab = cv2.cvtColor(source, cv2.COLOR_BGR2LAB).astype(np.float32)
        l_channel, a_channel, b_channel = cv2.split(lab)
        l_channel = (l_channel - 128) * (1.02 + 0.05 * intensity) + 128 + 3.5 * intensity
        a_channel = a_channel + 1.2 * intensity
        b_channel = b_channel + 0.5 * intensity
        graded = cv2.cvtColor(
            np.clip(cv2.merge((l_channel, a_channel, b_channel)), 0, 255).astype(np.uint8),
            cv2.COLOR_LAB2BGR,
        ).astype(np.float32)
        image = cv2.addWeighted(image, 0.42, graded, 0.58, 0)
        image[..., 2] *= 1.015 + 0.025 * intensity
        image[..., 1] *= 1.005
        image[..., 0] *= 0.985
        bloom = cv2.GaussianBlur(image, (0, 0), 6)
        image = cv2.addWeighted(image, 1.0, bloom, 0.035 + 0.045 * intensity, 0)
    elif effect_id == "soft-light":
        image[..., 2] *= 1.04 + 0.04 * intensity
        image[..., 0] *= 0.96
        blur = cv2.GaussianBlur(image, (0, 0), 7)
        image = cv2.addWeighted(image, 1.0, blur, 0.12 * intensity, 0)
    elif effect_id == "cinematic":
        shadows = image < 115
        image[..., 0] = np.where(shadows[..., 0], image[..., 0] * (1.08 + 0.07 * intensity), image[..., 0] * 0.96)
        image[..., 2] = np.where(shadows[..., 2], image[..., 2] * 0.92, image[..., 2] * (1.04 + 0.08 * intensity))
        image = (image - 128) * (1.05 + 0.12 * intensity) + 128
    elif effect_id == "old-photo":
        gray = cv2.cvtColor(np.clip(image, 0, 255).astype(np.uint8), cv2.COLOR_BGR2GRAY)
        sepia = np.zeros_like(image)
        sepia[..., 0] = gray * 0.72
        sepia[..., 1] = gray * 0.88
        sepia[..., 2] = gray * 1.08
        image = image * (0.25 * (1 - intensity)) + sepia * (0.75 + 0.25 * intensity)
    return np.clip(image, 0, 255).astype(np.uint8)


def process_bgr(bgr: np.ndarray, request: ProcessRequest) -> tuple[np.ndarray, list[str]]:
    used_models = ["opencv-pillow"]
    models = get_optional_models()
    intensity = request.intensity / 100.0

    image = limit_size(bgr)
    image = gray_world_white_balance(image)
    image = apply_clahe_luminance(image, clip_limit=1.45 + 0.55 * intensity)

    if request.packageId in ("portrait", "commercial"):
        image = natural_skin_smoothing(image, strength=0.24 + 0.28 * intensity)
        face_weight = 0.42 if request.packageId == "portrait" else 0.58
        image, used = models.enhance_face(image, weight=face_weight)
        if used:
            used_models.append("gfpgan")

    image = color_grade(image, request.effectId, intensity)

    if request.effectId == "minguo-film":
        image = add_grain(image, amount=0.06 + 0.08 * intensity)
        image = add_vignette(image, strength=0.05 + 0.06 * intensity)
    elif request.effectId == "old-photo":
        image = add_grain(image, amount=0.18 + 0.22 * intensity)
        image = add_vignette(image, strength=0.10 + 0.12 * intensity)
    elif request.effectId == "cinematic":
        image = add_vignette(image, strength=0.22 + 0.18 * intensity)

    if request.packageId == "commercial":
        image, used = models.upscale(image, outscale=1.5)
        if used:
            used_models.append("realesrgan")
        elif max(image.shape[:2]) < 2200:
            image = cv2.resize(image, None, fx=1.25, fy=1.25, interpolation=cv2.INTER_LANCZOS4)

    image = unsharp_mask(image, amount=0.35 + 0.35 * intensity)
    return image, used_models


def process_photo(photo_id: str, name: str, image_bytes: bytes, request: ProcessRequest) -> ProcessOutput:
    start = time.perf_counter()
    source = decode_image(image_bytes)
    processed, used_models = process_bgr(source, request)
    encoded, width, height = encode_jpeg(processed)
    elapsed_ms = int((time.perf_counter() - start) * 1000)

    return ProcessOutput(
        photo=ProcessedPhoto(
            id=photo_id,
            name=name or photo_id,
            base64=encoded,
            width=width,
            height=height,
            processingMs=elapsed_ms,
            usedModels=used_models,
        )
    )
