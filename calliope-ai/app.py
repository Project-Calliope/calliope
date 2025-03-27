"""
app.py
This module contains the Flask application for the Calliope AI project.
It defines a simple route that returns a welcome message.

Routes:
    / (home): Returns a welcome message.
"""

from fastapi import FastAPI
import uvicorn
from api.routes import transcribe_audio

app = FastAPI()

app.include_router(transcribe_audio, prefix="/api")

@app.get("/")
async def home():
    """
    A simple FastAPI route that returns a welcome message.
    Returns:
        dict: A dictionary containing a welcome message.
    """
    return {"message": "Hello from FastAPI API"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
