import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "BidReady AI"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+psycopg://postgres:password@localhost:5432/bidready_db")
    
    # AWS Settings
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    AWS_ACCESS_KEY_ID: str | None = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: str | None = os.getenv("AWS_SECRET_ACCESS_KEY")
    
    # Cognito Settings (Placeholders for now)
    COGNITO_USER_POOL_ID: str = os.getenv("COGNITO_USER_POOL_ID", "dummy_pool_id")
    COGNITO_APP_CLIENT_ID: str = os.getenv("COGNITO_APP_CLIENT_ID", "dummy_client_id")

    # LLM Settings (Gemini)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "gemini")

    class Config:
        env_file = ".env"

settings = Settings()