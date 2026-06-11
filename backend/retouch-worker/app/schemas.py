from typing import Literal

from pydantic import BaseModel, Field


PackageId = Literal["basic", "portrait", "commercial"]
EffectId = Literal["natural", "minguo-film", "soft-light", "cinematic", "old-photo"]
DeliveryId = Literal["standard", "rush", "express"]


class PhotoInput(BaseModel):
    id: str
    name: str = ""
    fileID: str = ""
    tempFileURL: str = ""
    url: str = ""
    retouched: bool = False


class ProcessRequest(BaseModel):
    orderId: str = ""
    orderNo: str
    packageId: PackageId
    effectId: EffectId
    deliveryId: DeliveryId = "standard"
    intensity: int = Field(default=60, ge=0, le=100)
    photos: list[PhotoInput]


class ProcessedPhoto(BaseModel):
    id: str
    name: str
    mimeType: str = "image/jpeg"
    base64: str
    width: int
    height: int
    processingMs: int
    usedModels: list[str]


class ProcessResponse(BaseModel):
    ok: bool
    orderNo: str
    results: list[ProcessedPhoto]
