import pytest
from io import BytesIO
from werkzeug.datastructures import FileStorage
from service.data_manager import DataManager

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

@pytest.fixture
def data_manager():
    return DataManager()

@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_validate_data_valid_audio(data_manager, mock_audio_file, audio_format):
    audio_file = mock_audio_file(audio_format)

    result = data_manager.validate_data(audio_file)

    assert result is True

def test_validate_data_audio_invalid(data_manager):
    corrupted_data = b'corrupted data'
    mock_file = FileStorage(
        stream=BytesIO(corrupted_data),
        filename='invalid_audio.mp3',
        content_type='audio/mp3'
    )

    result = data_manager.validate_data(mock_file)

    assert result is False

@pytest.mark.parametrize('format', ['txt', 'jpg', 'mp4'])
def test_validate_data_audio_formats(data_manager, mock_audio_file, format):
    mock_file = mock_audio_file(format)

    result = data_manager.validate_data(mock_file)

    assert result is False
