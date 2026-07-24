import uuid
from langchain_text_splitters import RecursiveCharacterTextSplitter


def process_document(document_id: str, file_path: str):
    """
    Extracts text from a PDF, chunks it, and creates embeddings.
    """
    # 1. Extract text from PDF using pypdf or PyMuPDF
    text = ""
    try:
        from pypdf import PdfReader
        reader = PdfReader(file_path)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    except Exception:
        try:
            import fitz
            doc = fitz.open(file_path)
            for page in doc:
                text += page.get_text() + "\n"
        except Exception:
            # Fallback text reading
            with open(file_path, "r", errors="ignore") as f:
                text = f.read()

        
    # 2. Chunk text using LangChain
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False,
    )
    texts = text_splitter.split_text(text)
    
    # 3. Create dummy embeddings (Bedrock mocked until AWS access is granted)
    # A mocked 1536-dimensional vector for pgvector testing
    chunks = []
    for i, chunk_text in enumerate(texts):
        mock_embedding = [0.0] * 1536
        mock_embedding[0] = 1.0  # Avoid all zeros
        
        chunks.append({
            "id": str(uuid.uuid4()),
            "document_id": document_id,
            "page_number": i + 1,  # Approximate page for chunks
            "content": chunk_text,
            "embedding": mock_embedding
        })
        
    return chunks
