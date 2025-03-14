import pytest

from io import BytesIO
from pydub import AudioSegment
from werkzeug.datastructures import FileStorage
from service.data_manager import DataManager

@pytest.fixture
def mock_audio_file():
    def _create_mock_audio(format):

        audio = AudioSegment.silent(duration=100)
        byte_io = BytesIO()
        if format == "mp3":
            audio.export(byte_io, format="mp3")
        elif format == "wav":
            audio.export(byte_io, format="wav")
        elif format == "m4a":
            audio.export(byte_io, format="mp4")
        byte_io.seek(0)
        
        mock_file = FileStorage(
            stream=byte_io,
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
    mock_file = mock_audio_file(audio_format)

    data_manager.load_audio(mock_file)
    result = data_manager.validate_data()

    assert result is True

def test_validate_data_audio_invalid(data_manager):
    corrupted_data = b'corrupted data'
    mock_file = FileStorage(
        stream=BytesIO(corrupted_data),
        filename='invalid_audio.mp3',
        content_type='audio/mp3'
    )

    data_manager.load_audio(mock_file)
    result = data_manager.validate_data()

    assert result is False

@pytest.mark.parametrize('format', ['txt', 'jpg', 'mp4'])
def test_validate_data_audio_formats(data_manager, mock_audio_file, format):
    mock_file = mock_audio_file(format)

    data_manager.load_audio(mock_file)
    result = data_manager.validate_data()

    assert result is False
