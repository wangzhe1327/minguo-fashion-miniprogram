from __future__ import annotations

import os
import sys
import types
from functools import lru_cache

import cv2
import numpy as np

from .settings import settings


def install_torchvision_compat() -> None:
    if "torchvision.transforms.functional_tensor" in sys.modules:
        return
    try:
        from torchvision.transforms import functional as functional
    except Exception:
        return

    compat = types.ModuleType("torchvision.transforms.functional_tensor")
    compat.rgb_to_grayscale = functional.rgb_to_grayscale
    sys.modules["torchvision.transforms.functional_tensor"] = compat


class OptionalModels:
    def __init__(self) -> None:
        self.gfpgan = None
        self.realesrgan = None
        self.used: list[str] = []
        self._load_gfpgan()
        self._load_realesrgan()

    def _load_gfpgan(self) -> None:
        if not settings.enable_gfpgan or not settings.gfpgan_model:
            return
        if not os.path.exists(settings.gfpgan_model):
            return
        try:
            install_torchvision_compat()
            from gfpgan import GFPGANer

            self.gfpgan = GFPGANer(
                model_path=settings.gfpgan_model,
                upscale=1,
                arch="clean",
                channel_multiplier=2,
                bg_upsampler=None,
                device=settings.device,
            )
        except Exception as exc:  # pragma: no cover - optional dependency path
            print(f"GFPGAN disabled: {exc}")
            self.gfpgan = None

    def _load_realesrgan(self) -> None:
        if not settings.enable_realesrgan or not settings.realesrgan_model:
            return
        if not os.path.exists(settings.realesrgan_model):
            return
        try:
            install_torchvision_compat()
            from basicsr.archs.rrdbnet_arch import RRDBNet
            from realesrgan import RealESRGANer

            model = RRDBNet(
                num_in_ch=3,
                num_out_ch=3,
                num_feat=64,
                num_block=23,
                num_grow_ch=32,
                scale=4,
            )
            self.realesrgan = RealESRGANer(
                scale=4,
                model_path=settings.realesrgan_model,
                model=model,
                tile=400,
                tile_pad=10,
                pre_pad=0,
                half=settings.device == "cuda",
                device=settings.device,
            )
        except Exception as exc:  # pragma: no cover - optional dependency path
            print(f"Real-ESRGAN disabled: {exc}")
            self.realesrgan = None

    def enhance_face(self, bgr: np.ndarray, weight: float) -> tuple[np.ndarray, bool]:
        if self.gfpgan is None:
            return bgr, False
        try:
            _, _, restored = self.gfpgan.enhance(
                bgr,
                has_aligned=False,
                only_center_face=False,
                paste_back=True,
                weight=weight,
            )
            return restored, True
        except Exception as exc:  # pragma: no cover - model runtime path
            print(f"GFPGAN failed: {exc}")
            return bgr, False

    def upscale(self, bgr: np.ndarray, outscale: float) -> tuple[np.ndarray, bool]:
        if self.realesrgan is None or outscale <= 1:
            return bgr, False
        try:
            upscaled, _ = self.realesrgan.enhance(bgr, outscale=outscale)
            return upscaled, True
        except Exception as exc:  # pragma: no cover - model runtime path
            print(f"Real-ESRGAN failed: {exc}")
            return bgr, False


@lru_cache(maxsize=1)
def get_optional_models() -> OptionalModels:
    return OptionalModels()
