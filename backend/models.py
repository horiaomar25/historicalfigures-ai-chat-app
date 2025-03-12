# defining database schema using sqlalchemy
# sqlalchemy is a SQL toolkit and Object-Relational Mapping (ORM) library for Python
from sqlalchemy import Column, Integer, Text, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./database.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False,bind=engine)
Base = declarative_base()

class Chat(Base):
    __tablename__ = 'chat'
    id = Column(Integer, primary_key=True, index=True)
    user_message = Column(Text, nullable=False)
    rasa_response = Column(Text, nullable=False)
    timestamp = Column(DateTime)
    
Base.metadata.create_all(bind=engine)