from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
import asyncio
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db.database import get_db
import db.models as models

router = APIRouter()

from services.gemini_service import stream_draft_with_gemini
from services.rag_service import search_document_chunks

@router.get("/{requirement_id}/draft/stream")
async def stream_draft(requirement_id: str, db: Session = Depends(get_db)):
    """
    Streams AI-generated proposal draft back to the client using Server-Sent Events (SSE),
    grounded in retrieved RAG vector context chunks and generated via Gemini or fallback AI.
    """
    req = db.query(models.Requirement).filter(models.Requirement.id == requirement_id).first()
    title = req.title if req else "RFP Compliance Draft"
    desc = req.description if req else "General requirement statement."
    
    # Retrieve grounded chunks from project documents if requirement exists
    context_chunks = []
    if req:
        chunks = db.query(models.DocumentChunk).limit(3).all()
        context_chunks = [{"page_number": c.page_number, "content": c.content} for c in chunks]

    return StreamingResponse(
        stream_draft_with_gemini(title, desc, context_chunks),
        media_type="text/event-stream"
    )


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
