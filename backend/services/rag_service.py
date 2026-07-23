from sqlalchemy.orm import Session
from db.models import DocumentChunk
from typing import List

def search_document_chunks(db: Session, document_id: str, query: str, top_k: int = 5) -> List[DocumentChunk]:
    """
    Searches a document for the most relevant text chunks using pgvector cosine distance.
    """
    # 1. Convert query text to vector embedding (Mocked for now)
    # In production, call Amazon Bedrock Titan Embeddings API here
    query_embedding = [0.0] * 1536
    query_embedding[0] = 1.0
    
    # 2. Query pgvector using SQLAlchemy
    # The cosine_distance method maps to the <=> operator in PostgreSQL
    results = db.query(DocumentChunk).filter(
        DocumentChunk.document_id == document_id
    ).order_by(
        DocumentChunk.embedding.cosine_distance(query_embedding)
    ).limit(top_k).all()
    
    return results
