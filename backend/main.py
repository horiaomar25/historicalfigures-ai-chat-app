from fastapi import FastAPI
from sqlalchemy.orm import Session
import httpx # To make HTTP requests to Rasa's API
from .models import Base, Chat, SessionLocal, engine
from .utils import format_timestamp
from datetime import datetime

app = FastAPI()

# Define the Rasa server URL (make sure Rasa is running on this port)
RASA_SERVER_URL = "http://localhost:5005/webhooks/rest/webhook"

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

@app.post("/chat")
async def chat(message: str, db: Session = Depends(get_db)):
   
    async with httpx.AsyncClient() as client:
        response = await client.post(RASA_SERVER_URL, json={"sender" : "user", "message" : message})
        
    # Return the response from Rasa
    rasa_response = response.json()
    
    # Save the chat to database with a timestamp
    chat = Chat(user_message=message, rasa_response=str(rasa_response), timestamp=datetime.utcnow())
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return {"response": rasa_response}

@app.get("/chats")
def get_chats(db: Session = Depends(get_db)):
    chats = db.query(Chat).all()
    formatted_chats = [
        {
            "user_message": chat.user_message,
            "rasa_response": chat.rasa_response,
            "timestamp": format_timestamp(chat.timestamp)
        }
        for chat in chats
    ]
    return {"chats": formatted_chats}

@app.get("/")
def read_root():
    return {"message": "FastAPI is running"}
