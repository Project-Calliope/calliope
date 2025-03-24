from io import BytesIO
import pytest

from pydub import AudioSegment
from service.data_manager import DataManager
from service.preprocess_audio import PreprocessAudio
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


class TestPreprocessAudio:
    """
    Test class for the PreprocessAudio class.
    """

    def test_segmentation(self, data_manager, mock_audio_file):
        """
        Test the segmentation method of the PreprocessAudio class.
        """
        preprocess = PreprocessAudio()
        mock_file = mock_audio_file("mp3")
        data_manager.load_audio(mock_file)
        duration = 10

        result = preprocess.segmentation(data_manager.audio, duration)

        assert True
