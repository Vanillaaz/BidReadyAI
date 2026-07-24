from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector
from db.database import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    client_name = Column(String)
    deadline = Column(DateTime(timezone=True))
    status = Column(String, default="active")
    compliance_score = Column(Float, default=0.0)
    total_requirements = Column(Float, default=0.0)
    high_risk_gaps = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    documents = relationship("Document", back_populates="project")
    requirements = relationship("Requirement", back_populates="project")

class Document(Base):
    __tablename__ = "documents"
    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"))
    name = Column(String)
    document_type = Column(String)
    s3_key = Column(String)
    page_count = Column(Float)
    processing_status = Column(String, default="pending")
    
    project = relationship("Project", back_populates="documents")
    chunks = relationship("DocumentChunk", back_populates="document")

class Requirement(Base):
    __tablename__ = "requirements"
    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"))
    category = Column(String)
    title = Column(String)
    description = Column(Text)
    priority = Column(String)
    gap_status = Column(String, default="Fully Covered")
    owner = Column(String, default="Unassigned")
    confidence_score = Column(Float, default=90.0)
    risk_level = Column(String, default="Low Risk")
    evidence_citations = Column(Text, nullable=True)
    draft_content = Column(Text, nullable=True)
    source_page = Column(String)
    status = Column(String, default="pending")
    
    project = relationship("Project", back_populates="requirements")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"
    id = Column(String, primary_key=True, index=True)
    document_id = Column(String, ForeignKey("documents.id"))
    page_number = Column(Float)
    content = Column(Text)
    embedding = Column(Vector(1536))  # 1536 is standard for many embedding models
    
    document = relationship("Document", back_populates="chunks")
