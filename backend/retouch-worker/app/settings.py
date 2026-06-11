from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="RETOUCH_")

    worker_token: str = ""
    max_photos: int = 30
    max_edge: int = 2400
    jpeg_quality: int = 94
    request_timeout: int = 25
    enable_gfpgan: bool = False
    gfpgan_model: str = ""
    enable_realesrgan: bool = False
    realesrgan_model: str = ""
    device: str = "cuda"


settings = Settings()
