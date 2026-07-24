from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class ProjectBase(BaseModel):
    name: str
    client_name: Optional[str] = None
    deadline: Optional[datetime] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str
    status: Optional[str] = "active"
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
