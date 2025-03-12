import pytest
from werkzeug.datastructures import FileStorage
from io import BytesIO
from api.app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def mock_audio_file():
    def _create_mock_audio(format):
        mock_file = FileStorage(
            stream=BytesIO(b"Fake audio data"),
            filename=f"test_audio.{format}",
            content_type=f"audio/{format}"
        )
        return mock_file

    return _create_mock_audio


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_transcribe_valid_audio(client, mock_audio_file, audio_format):
    audio_file = mock_audio_file(audio_format)

    response = client.post('/api/transcribe', data={'file': audio_file})

    assert response.status_code == 200

    json_data = response.get_json()
    assert "transcript" in json_data
    assert isinstance(json_data["transcript"], str)


def test_transcribe_audio_missing_file(client):
    response = client.post('/api/transcribe')

    assert response.status_code == 400

    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'Audio file is required'


def test_transcribe_audio_invalid(client):
    """Test that invalid or corrupted audio file returns a 400 error."""
    corrupted_data = b'corrupted data'
    mock_file = FileStorage(
        stream=BytesIO(corrupted_data),
        filename='invalid_audio.mp3',
        content_type='audio/mp3'
    )

    response = client.post('/api/transcribe', data={'file': mock_file})

    assert response.status_code == 400

    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'Corrupted or unreadable audio file'


@pytest.mark.parametrize('format', ['txt', 'jpg', 'mp4'])
def test_transcribe_audio_formats(client, mock_audio_file, format):
    mock_file = mock_audio_file(format)

    response = client.post('/api/transcribe', data={'file': mock_file})

    assert response.status_code == 415

    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'Unsupported audio format'
