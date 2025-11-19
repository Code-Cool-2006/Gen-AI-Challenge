import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

# -------- DATABASE CONFIG ---------

# Use your MySQL database
DATABASE_URL = (
    "mysql+pymysql://root:O-S-N-312@localhost/careerbridge"
)

# Engine connects SQLAlchemy to MySQL
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600
)

# Create session maker
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
Base = declarative_base()


# -------- Dependency for FastAPI ---------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
