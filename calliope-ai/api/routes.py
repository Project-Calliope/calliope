"""
This module defines the FastAPI routes for the audio transcription service.

Routes:
    - POST /transcribe: Handles the transcription of uploaded audio files.

Usage:
    This module is included in the main FastAPI application to provide
    transcription capabilities via API calls.

Dependencies:
    - FastAPI
    - APIHandler from `service.api_handler`
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from service.api_handler import APIHandler


transcribe_audio = APIRouter()
summarize_text = APIRouter()


class TextRequest(BaseModel):
    text: str


@transcribe_audio.post("/transcribe")
async def transcribe_audio_route(file: UploadFile = File(None)):
    """
    Handles the transcription of an uploaded audio file.

    Args:
        file (UploadFile, optional): The uploaded audio file. Defaults to None.

    Returns:
        dict: A JSON response containing the transcription or an error message.

    Raises:
        HTTPException: If no file is provided (400 error).
        HTTPException: If the file type is unsupported (415 error).
    """
    if file is None:
        raise HTTPException(status_code=400, detail="Audio file is required")

    filename = file.filename
    filetype = file.content_type
    filecontent = file.file

    file = {"filename": filename, "filetype": filetype, "filecontent": filecontent}

    handler = APIHandler()
    success, message = handler.transcribe(file)

    if not success:
        raise HTTPException(status_code=415, detail=message)

    return {"transcript": message}


@summarize_text.post("/summarize")
async def summarize_text_route(request: TextRequest):
    """
    Summarizes the provided French text.

    Args:
        request (TextRequest): JSON body containing the input text.

    Returns:
        dict: A JSON response with the summarized text.

    Raises:
        HTTPException: If the input text is empty (415 error).
    """
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text is required")

    handler = APIHandler()
    success, summary = handler.summarize(request.text)

    if not success:
        raise HTTPException(status_code=415, detail="Summarization failed")

    return {"summary": summary}
