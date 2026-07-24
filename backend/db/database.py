from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

from sqlalchemy import text

Base = declarative_base()

def init_db():
    Base.metadata.create_all(bind=engine)
    try:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE projects ADD COLUMN IF NOT EXISTS compliance_score FLOAT DEFAULT 0.0;"))
            conn.execute(text("ALTER TABLE projects ADD COLUMN IF NOT EXISTS total_requirements FLOAT DEFAULT 0.0;"))
            conn.execute(text("ALTER TABLE projects ADD COLUMN IF NOT EXISTS high_risk_gaps FLOAT DEFAULT 0.0;"))
            conn.execute(text("ALTER TABLE requirements ADD COLUMN IF NOT EXISTS gap_status VARCHAR DEFAULT 'Fully Covered';"))
            conn.execute(text("ALTER TABLE requirements ADD COLUMN IF NOT EXISTS owner VARCHAR DEFAULT 'Unassigned';"))
            conn.execute(text("ALTER TABLE requirements ADD COLUMN IF NOT EXISTS confidence_score FLOAT DEFAULT 90.0;"))
            conn.execute(text("ALTER TABLE requirements ADD COLUMN IF NOT EXISTS risk_level VARCHAR DEFAULT 'Low Risk';"))
            conn.execute(text("ALTER TABLE requirements ADD COLUMN IF NOT EXISTS evidence_citations TEXT;"))
            conn.commit()
    except Exception as e:
        print(f"Schema migration note: {e}")

init_db()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

