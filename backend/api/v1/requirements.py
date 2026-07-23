from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
import asyncio
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db.database import get_db
import db.models as models

router = APIRouter()

@router.get("/{requirement_id}/draft/stream")
async def stream_draft(requirement_id: str):
    """
    Streams a mock AI-generated draft back to the client using Server-Sent Events (SSE).
    """
    async def event_generator():
        mock_response = (
            "Based on the RFP requirements, this is a simulated AI draft. "
            "In production, this endpoint will connect directly to Amazon Bedrock "
            "and stream tokens in real-time as the Claude 3 model generates them. "
            "We are yielding word by word to verify the frontend streaming architecture works! "
            "End of draft."
        )
        words = mock_response.split(" ")
        for word in words:
            await asyncio.sleep(0.15)  # Simulate network latency of AI token generation
            # SSE format requires "data: <content>\n\n"
            yield f"data: {word} \n\n"
            
        yield "data: [DONE]\n\n"
            
    return StreamingResponse(event_generator(), media_type="text/event-stream")

class DraftUpdateRequest(BaseModel):
    draft_content: str

@router.put("/{requirement_id}/draft")
async def update_requirement_draft(requirement_id: str, request: DraftUpdateRequest, db: Session = Depends(get_db)):
    req = db.query(models.Requirement).filter(models.Requirement.id == requirement_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Requirement not found")
        
    req.draft_content = request.draft_content
    db.commit()
    db.refresh(req)
    return req

@router.get("/{requirement_id}")
async def get_requirement(requirement_id: str, db: Session = Depends(get_db)):
    req = db.query(models.Requirement).filter(models.Requirement.id == requirement_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Requirement not found")
    return req
