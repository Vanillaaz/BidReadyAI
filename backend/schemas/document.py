from pydantic import BaseModel
from typing import Optional

class DocumentBase(BaseModel):
    name: str
    document_type: str
    s3_key: str
    page_count: Optional[float] = None
    processing_status: str = "pending"

class DocumentCreate(DocumentBase):
    project_id: str

class DocumentResponse(DocumentBase):
    id: str
    project_id: str

    class Config:
        from_attributes = True
