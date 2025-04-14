"""
app.py

This module initializes and runs the FastAPI application for the Calliope AI project.
It sets up the main API routes and includes the transcription-related endpoints.

Routes:
    / (GET): Returns a welcome message.
    /api (prefix): Includes routes from the transcribe_audio router.

Usage:
    Run this script to start the FastAPI server.

Dependencies:
    - FastAPI
    - Uvicorn
    - API routes from the `api.routes.transcribe_audio` module
"""

from fastapi import FastAPI
import uvicorn
from api.routes import transcribe_audio
from api.routes import summarize_text

app = FastAPI()

# Include the transcription API routes under the /api prefix
app.include_router(transcribe_audio, prefix="/api")
app.include_router(summarize_text, prefix="/api")


@app.get("/")
async def home():
    """
    Home route that returns a welcome message.

    Returns:
        dict: A dictionary containing a welcome message.
    """
    return {"message": "Hello from FastAPI API"}


if __name__ == "__main__":
    # Entry point for running the FastAPI application.
    # The application is served using Uvicorn on host 0.0.0.0 and port 8000.
    uvicorn.run(app, host="0.0.0.0", port=8000)
