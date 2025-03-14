import pytest

from werkzeug.datastructures import FileStorage
from io import BytesIO
from app import app
from pydub import AudioSegment


@pytest.fixture
def client():
    """
    Fixture to initialize a Flask test client.
    Used to simulate HTTP requests to the API.
    """
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


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
        elif format == "wav":
            audio.export(byte_io, format="wav")
        elif format == "m4a":
            audio.export(byte_io, format="ipod")

        byte_io.seek(0)

        mock_file = FileStorage(
            stream=byte_io,
            filename=f"test_audio.{format}",
            content_type=f"audio/{format}",
        )

        return mock_file

    return _create_mock_audio


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_transcribe_valid_audio(client, mock_audio_file, audio_format):
    """
    Tests the `/api/transcribe` route with valid audio files in various formats.

    Verifies that transcription occurs correctly for supported audio formats
    (wav, mp3, m4a).

    Parameters:
        client: Flask test client fixture.
        mock_audio_file: Fixture to create a mock audio file.
        audio_format (str): The audio format being tested ('wav', 'mp3', 'm4a').
    """
    audio_file = mock_audio_file(audio_format)

    response = client.post("/api/transcribe", data={"file": audio_file})

    assert response.status_code == 200

    json_data = response.get_json()

    assert "transcript" in json_data
    assert isinstance(json_data["transcript"], str)


def test_transcribe_audio_missing_file(client):
    """
    Tests the `/api/transcribe` route when the audio file is missing in the request.

    Verifies that the API returns a 400 error with the message 'Audio file is required'.

    Parameters:
        client: Flask test client fixture.
    """
    response = client.post("/api/transcribe")

    assert response.status_code == 400

    data = response.get_json()

    assert "error" in data
    assert data["error"] == "Audio file is required"


@pytest.mark.parametrize("format", ["txt", "jpg", "mp4"])
def test_transcribe_audio_formats(client, mock_audio_file, format):
    """
    Tests the `/api/transcribe` route with unsupported file formats.

    Verifies that the API returns a 415 error for unsupported audio formats.

    Parameters:
        client: Flask test client fixture.
        mock_audio_file: Fixture to create a mock audio file.
        format (str): The audio format being tested ('txt', 'jpg', 'mp4').
    """
    mock_file = mock_audio_file(format)

    response = client.post("/api/transcribe", data={"file": mock_file})

    assert response.status_code == 415

    data = response.get_json()

    assert "error" in data
    assert data["error"] == "Audio file is corrupted or in an unsupported format."
