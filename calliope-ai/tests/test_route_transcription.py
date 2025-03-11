import pytest
from unittest.mock import MagicMock
from api.app import app


@pytest.fixture
def client():
    """Fixture to create a Flask test client for testing requests."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def mock_audio_file():
    """Fixture to create mock audio files of different formats."""
    def _create_mock_audio(format):
        mock_file = MagicMock()
        mock_file.read.return_value = b"Fake audio data"
        mock_file.filename = f"test_audio.{format}"
        mock_file.mimetype = f"audio/{format}"
        return mock_file

    return _create_mock_audio


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_transcribe_valid_audio(client, mock_audio_file, audio_format):
    """Test valid audio files of various formats are transcribed correctly."""
    audio_file = mock_audio_file(audio_format)

    response = client.post(
        "/api/transcribe",
        content_type="multipart/form-data",
        data={"file": (audio_file.read(), audio_file.filename)}
    )

    assert response.status_code == 200

    json_data = response.get_json()
    assert "transcript" in json_data
    assert isinstance(json_data["transcript"], str)


def test_transcribe_audio_missing_file(client):
    """Test that missing audio file returns a 400 error with appropriate message."""
    response = client.post('/api/transcribe')

    assert response.status_code == 400

    data = response.json()
    assert 'error' in data
    assert data['error'] == 'Audio file is required'


def test_transcribe_audio_invalid(client):
    """Test that invalid or corrupted audio file returns a 400 error."""
    mock_file = MagicMock()
    mock_file.filename = 'invalid_audio.ogg'
    mock_file.content_type = 'audio/ogg'
    mock_file.read.return_value = b'corrupted data'

    response = client.post('/api/transcribe', data={'file': mock_file})

    assert response.status_code == 400

    data = response.json()
    assert 'error' in data
    assert data['error'] == 'Corrupted or unreadable audio file'


@pytest.mark.parametrize('format', ['txt', 'jpg', 'mp4'])
def test_transcribe_audio_formats(client, mock_audio_file, format):
    """Test unsupported formats return a 415 error."""
    mock_file = mock_audio_file(format)

    response = client.post('/api/transcribe', data={'file': mock_file})

    assert response.status_code == 415

    data = response.json()
    assert 'error' in data
    assert data['error'] == 'Unsupported audio format'
