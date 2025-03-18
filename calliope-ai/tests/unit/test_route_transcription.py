import pytest

from werkzeug.datastructures import FileStorage
from io import BytesIO
from app import app
from fastapi.testclient import TestClient
from pydub import AudioSegment


@pytest.fixture
def client():
    """
    Fixture to initialize a FastAPI test client.
    Used to simulate HTTP requests to the API.
    """
    return TestClient(app)


@pytest.fixture
def mock_audio_file():
    """
    Fixture to create a mock audio file in various formats (mp3, wav, m4a).
    The file is generated from a 100ms silent audio.

    Parameters:
        format (str): The audio file format ('mp3', 'wav', 'm4a').

    Returns:
        mock_file (werkzeug.datastructures.FileStorage): The mock audio file as a FileStorage object.
    """

    def _create_mock_audio(format):

        audio = AudioSegment.silent(duration=100)
        byte_io = BytesIO()

        if format == "mp3":
            audio.export(byte_io, format="mp3")
            mime_type = "audio/mpeg"
        elif format == "wav":
            audio.export(byte_io, format="wav")
            mime_type = "audio/wav"
        elif format == "m4a":
            audio.export(byte_io, format="ipod")
            mime_type = "audio/mp4"
        else:
            byte_io.write(b"fake data")  # Fichier corrompu/non valide
            mime_type = "application/octet-stream"

        byte_io.seek(0)

        return byte_io, mime_type

    return _create_mock_audio


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_transcribe_valid_audio(client, mock_audio_file, audio_format):
    """
    Test de la route `/api/transcribe` avec des fichiers audio valides.
    """
    audio_data, mime_type = mock_audio_file(audio_format)
    files = {"file": (f"test.{audio_format}", audio_data, mime_type)}

    response = client.post("/api/transcribe", files=files)

    assert response.status_code == 200

    json_data = response.json()
    assert "transcript" in json_data
    assert isinstance(json_data["transcript"], str)


def test_transcribe_audio_missing_file(client):
    """
    Tests the `/api/transcribe` route when the audio file is missing in the request.

    Verifies that the API returns a 400 error with the message 'Audio file is required'.

    Parameters:
        client: fasapi test client fixture.
    """
    response = client.post("/api/transcribe")

    assert response.status_code == 400

    data = response.json()

    print("data content: ", data, "________________")

    assert "detail" in data
    assert data["detail"] == "Audio file is required"


@pytest.mark.parametrize("file_format", ["txt", "jpg", "mp4"])
def test_transcribe_invalid_formats(client, mock_audio_file, file_format):
    """
    Test de la route `/api/transcribe` avec des fichiers non-audio.

    Vérifie que l'API retourne une erreur 415 avec le message 'Audio file is corrupted or in an unsupported format'.

    Parameters:
        client: Fixture du client de test fastapi.
        mock_audio_file: Fixture pour créer un fichier audio simulé.
        file_format (str): Le format du fichier à tester.
    """
    file_data, mime_type = mock_audio_file(file_format)
    files = {"file": (f"test.{file_format}", file_data, mime_type)}

    response = client.post("/api/transcribe", files=files)

    assert response.status_code == 415
    assert response.json() == {
        "detail": "Audio file is corrupted or in an unsupported format."
    }
