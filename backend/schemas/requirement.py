from pydantic import BaseModel
from typing import Optional

class RequirementBase(BaseModel):
    category: Optional[str] = "Technical"
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = "High"
    gap_status: Optional[str] = "Fully Covered"
    owner: Optional[str] = "Unassigned"
    confidence_score: Optional[float] = 90.0
    risk_level: Optional[str] = "Low Risk"
    evidence_citations: Optional[str] = None
    draft_content: Optional[str] = None
    source_page: Optional[str] = "1"
    status: Optional[str] = "pending"

class RequirementCreate(RequirementBase):
    project_id: str

class RequirementResponse(RequirementBase):
    id: str
    project_id: str

    class Config:
        from_attributes = True
