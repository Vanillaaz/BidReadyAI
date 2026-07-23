from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ProjectBase(BaseModel):
    name: str
    client_name: Optional[str] = None
    deadline: Optional[datetime] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
