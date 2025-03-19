"""
This module contains the FastAPI routes for the audio transcription service.
It provides
- a POST route for transcribing audio files
"""

from typing import Optional

from fastapi import APIRouter, UploadFile, File, HTTPException
from service.api_handler import APIHandler


transcribe_audio = APIRouter()


@transcribe_audio.post("/transcribe")
async def transcribe_audio_route(file: Optional[UploadFile] = File(None)):
    """
    Route for audio transcription.

    Args:
        file (UploadFile): The uploaded audio file.

    Returns:
        dict: A JSON response with the transcript or an error message.
    """
    if file is None:
        raise HTTPException(status_code=400, detail="Audio file is required")

    handler = APIHandler()
    success, message = handler.transcribe(file)

    if not success:
        raise HTTPException(status_code=415, detail=message)

    return {"transcript": message}
