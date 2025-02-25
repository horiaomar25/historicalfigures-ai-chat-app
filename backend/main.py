from fastapi import FastAPI
import httpx # To make HTTP requests to Rasa's API

app = FastAPI()

# Define the Rasa server URL (make sure Rasa is running on this port)
RASA_SERVER_URL = "http://localhost:5005/webhooks/rest/webhook"

@app.post("/chat")
async def chat(message: str):
    # Send user message to Rasa and get response
    async with httpx.AsyncClient() as client:
        response = await client.post(RASA_SERVER_URL, json={"sender" : "user", "message" : message})
        
    # Return the response from Rasa
    rasa_response = response.json()
    return {"response": rasa_response}

@app.get("/")
def read_root():
    return {"message": "FastAPI is running"}
