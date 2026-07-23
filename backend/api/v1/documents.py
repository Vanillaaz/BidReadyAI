from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import uuid
import shutil
import os

from db.database import get_db
from db import models
from schemas import document as schemas
from services.ingestion_service import process_document

router = APIRouter()

@router.post("/upload", response_model=schemas.DocumentResponse)
async def upload_document(
    project_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Verify project exists
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    # Save file temporarily (in production this goes directly to AWS S3)
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = f"{upload_dir}/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Create document record in database
    db_doc = models.Document(
        id=str(uuid.uuid4()),
        project_id=project_id,
        name=file.filename,
        document_type=file.content_type,
        s3_key=file_path,
        page_count=0,
        processing_status="processing"
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    
    # Trigger Ingestion Pipeline (Text Extraction, Chunking + Embeddings)
    chunks = process_document(db_doc.id, file_path)
    
    # Save chunks to PostgreSQL pgvector
    for chunk in chunks:
        db_chunk = models.DocumentChunk(
            id=chunk["id"],
            document_id=db_doc.id,
            page_number=chunk["page_number"],
            content=chunk["content"],
            embedding=chunk["embedding"]
        )
        db.add(db_chunk)
        
    # Update document status
    db_doc.processing_status = "completed"
    db.commit()
    db.refresh(db_doc)
    
    return db_doc

from services.rag_service import search_document_chunks

@router.post("/{document_id}/search")
async def search_document(
    document_id: str,
    query: str = Form(...),
    top_k: int = Form(5),
    db: Session = Depends(get_db)
):
    # Verify document exists
    doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    chunks = search_document_chunks(db, document_id, query, top_k)
    
    return {
        "query": query,
        "results": [
            {
                "page_number": chunk.page_number,
                "content": chunk.content
            }
            for chunk in chunks
        ]
    }
