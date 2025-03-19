from io import BytesIO

import pytest

from pydub import AudioSegment
from service.data_manager import DataManager
from fastapi import UploadFile


@pytest.fixture
def mock_audio_file():
    """Fixture to create a mock audio file in various formats (mp3, wav, m4a)."""

    def _create_mock_audio(format):
        """Create a mock audio file in the specified format.

        param :
            format: audio format to create
        """

        audio = AudioSegment.silent(duration=100)  # 100ms

        byte_io = BytesIO()

        format_dict = {
            "mp3": ("mp3", "audio/mpeg"),
            "wav": ("wav", "audio/wav"),
            "m4a": ("ipod", "audio/mp4"),
        }

        if format in format_dict:
            audio.export(byte_io, format=format_dict[format][0])
            mime_type = format_dict[format][1]
        else:
            byte_io.write(b"fake data")
            mime_type = "application/octet-stream"

        byte_io.seek(0)

        return UploadFile(filename=f"test_audio.{format}", file=byte_io)

    return _create_mock_audio


@pytest.fixture
def data_manager():
    """Fixture to initialize a DataManager instance."""
    return DataManager()


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_validate_data_valid_audio(data_manager, mock_audio_file, audio_format):
    """Test the validation of valid audio files.

    param :
        data_manager: DataManager instance (fixture)
        mock_audio_file: mock_audio_file fixture
        audio_format: audio format to test
    """

    mock_file = mock_audio_file(audio_format)
    data_manager.load_audio(mock_file)

    result = data_manager.validate_data()
    assert result is True


def test_validate_data_audio_invalid(data_manager):
    """Test the validation of corrupted audio files.

    param :
        data_manager: DataManager instance (fixture)
    """

    corrupted_data = BytesIO(b"corrupted data")
    mock_file = UploadFile(filename="invalid_audio.mp3", file=corrupted_data)

    data_manager.load_audio(mock_file)
    result = data_manager.validate_data()

    assert result is False


@pytest.mark.parametrize("format", ["txt", "jpg", "mp4"])
def test_validate_data_audio_formats(data_manager, mock_audio_file, format):
    """Test the validation of unsupported audio formats."""
    mock_file = mock_audio_file(format)

    data_manager.load_audio(mock_file)
    result = data_manager.validate_data()

    assert result is False
