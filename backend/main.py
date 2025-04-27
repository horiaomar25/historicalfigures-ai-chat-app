from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv
from models import Base
import os

# Load environment variables from .env
load_dotenv()

# Fetch variables (use uppercase keys to match your .env file)
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
DBNAME = os.getenv("DBNAME")

print("USER =", os.getenv("USER"))
print("PASSWORD =", os.getenv("PASSWORD"))

# Construct the SQLAlchemy connection string
DATABASE_URL = "postgresql+psycopg2://postgres:your_actual_password@db.ykqzncwwddgyfvbqcyty.supabase.co:5432/postgres"

# Debugging: Print the constructed DATABASE_URL
print(f"DATABASE_URL: {DATABASE_URL}")

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL, poolclass=NullPool)

# Test the connection
try:
    with engine.connect() as connection:
        print("Connection successful!")
except Exception as e:
    print(f"Failed to connect: {e}")

# Create the tables
try:
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")
except Exception as e:
    print(f"Failed to create tables: {e}")