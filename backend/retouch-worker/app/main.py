from __future__ import annotations

import time

import requests
from fastapi import FastAPI, Header, HTTPException

from .processor import process_photo
from .schemas import ProcessRequest, ProcessResponse
from .settings import settings

app = FastAPI(title="Minguo Fashion Retouch Worker", version="1.0.0")


def verify_token(authorization: str | None) -> None:
    if not settings.worker_token:
        return
    expected = f"Bearer {settings.worker_token}"
    if authorization != expected:
        raise HTTPException(status_code=401, detail="UNAUTHORIZED")


def download_photo(url: str) -> bytes:
    if not url:
        raise HTTPException(status_code=400, detail="PHOTO_URL_REQUIRED")

    response = requests.get(url, timeout=settings.request_timeout)
    response.raise_for_status()
    content_type = response.headers.get("content-type", "")
    if "image" not in content_type and not url.lower().split("?")[0].endswith((".jpg", ".jpeg", ".png", ".webp")):
        raise HTTPException(status_code=400, detail="PHOTO_NOT_IMAGE")
    return response.content


@app.get("/health")
def health() -> dict:
    return {
        "ok": True,
        "service": "retouch-worker",
        "time": int(time.time()),
        "gfpgan": settings.enable_gfpgan,
        "realesrgan": settings.enable_realesrgan,
    }


@app.post("/process", response_model=ProcessResponse)
def process_order(request: ProcessRequest, authorization: str | None = Header(default=None)) -> ProcessResponse:
    verify_token(authorization)

    if not request.photos:
        raise HTTPException(status_code=400, detail="EMPTY_PHOTOS")
    if len(request.photos) > settings.max_photos:
        raise HTTPException(status_code=400, detail="TOO_MANY_PHOTOS")

    results = []
    for index, photo in enumerate(request.photos, start=1):
        image_bytes = download_photo(photo.tempFileURL or photo.url)
        name = photo.name or f"交付成片 {index:02d}"
        result = process_photo(photo.id, name, image_bytes, request)
        results.append(result.photo)

    return ProcessResponse(ok=True, orderNo=request.orderNo, results=results)
