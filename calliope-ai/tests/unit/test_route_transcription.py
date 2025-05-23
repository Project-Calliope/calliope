"""
Unit tests for the transcription route of the FastAPI application.

These tests validate the `/api/transcribe` endpoint by simulating requests with various
audio files, verifying the transcription process, and ensuring that errors are handled
properly.

The tests cover scenarios with valid and invalid audio formats, missing files, and
real-world audio files for transcription validation.
"""

import os

from io import BytesIO

import pytest

from fastapi import UploadFile
from fastapi.testclient import TestClient
from pydub import AudioSegment

from app import app


@pytest.fixture
def client():
    """
    Fixture to initialize a FastAPI test client.

    This fixture creates and returns a TestClient instance that simulates HTTP requests to the
    FastAPI application. It is useful for testing routes and interacting with the app without
    starting an actual server.

    Returns:
        TestClient: A FastAPI test client instance.
    """
    return TestClient(app)


@pytest.fixture
def mock_audio_file():
    """
    Fixture to create a mock audio file in various formats (mp3, wav, m4a).
    The file is generated from a 100ms silent audio.

    Args:
        format (str): The audio file format ('mp3', 'wav', 'm4a').

    Returns:
        UploadFile: The mock audio file represented as an UploadFile object.
    """

    def _create_mock_audio(file_format):
        """Create a mock audio file in the specified format.

        Args:
            file_format (str): The audio format to create ('mp3', 'wav', 'm4a').

        Returns:
            UploadFile: The mock audio file as an UploadFile object.
        """
        audio = AudioSegment.silent(duration=100)
        byte_io = BytesIO()

        if file_format == "mp3":
            audio.export(byte_io, format="mp3")
            mime_type = "audio/mp3"
        elif file_format == "wav":
            audio.export(byte_io, format="wav")
            mime_type = "audio/wav"
        elif file_format == "m4a":
            audio.export(byte_io, format="ipod")
            mime_type = "audio/m4a"
        else:
            byte_io.write(b"fake data")
            mime_type = "application/octet-stream"

        byte_io.seek(0)
        headers = {"content_type": mime_type}

        file = UploadFile(
            filename=f"test_audio.{file_format}", headers=headers, file=byte_io
        )

        return file

    return _create_mock_audio


def test_transcribe_real_audio(client):
    """
    Test the transcription of a real audio file.

    This test ensures that the transcription of a real audio file (wav format) is processed
    correctly. It compares the API's transcription result with an expected transcription string.

    Args:
        client: FastAPI test client fixture to make HTTP requests.

    Asserts:
        - The status code of the response is 200.
        - The response contains a 'transcript' key with a string value.
        - The transcription matches the expected transcription.
    """
    expected_transcription = (
        "BUT, WITH FULL RAVISHMENT THE HOURS OF PRIME, SINGING, "
        "RECEIVED THEY IN THE MIDST OF LEAVES THAT EVER BORE A BURDEN TO THEIR RHYMES."
    )

    audio_filename = "test.wav"
    audio_path = os.path.join(os.path.dirname(__file__), audio_filename)

    assert os.path.exists(audio_path), f"Fichier manquant : {audio_path}"

    with open(audio_path, "rb") as audio_file:
        files = {"file": (audio_filename, audio_file, "audio/wav")}

        response = client.post("/api/transcribe", files=files)

    assert response.status_code == 200

    json_data = response.json()
    assert "transcript" in json_data
    assert isinstance(json_data["transcript"], str)

    assert (
        json_data["transcript"].strip().upper() == expected_transcription
    ), f"Transcription incorrecte : {json_data['transcript']}"
