from io import BytesIO
import pytest

from pydub import AudioSegment
from service.data_manager import DataManager
from service.preprocess_audio import PreprocessAudio
from fastapi import UploadFile


@pytest.fixture
def mock_audio_file():
    """Fixture to create a mock audio file in various formats (mp3, wav, m4a).

    This fixture creates a mock audio file that is 100ms of silence in the specified format.
    It is used for testing purposes.

    Returns:
        dict: A dictionary containing 'filename', 'filetype', and 'filecontent' representing the mock audio file.
    """

    def _create_mock_audio(format):
        """Create a mock audio file in the specified format.

        Args:
            format (str): The audio format to create (e.g., "mp3", "wav", "m4a").

        Returns:
            dict: A dictionary containing 'filename', 'filetype', and 'filecontent' representing the mock audio file.
        """
        audio = AudioSegment.silent(duration=100)  # 100ms of silence

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

        file = {
            "filename": f"test_audio.{format}",
            "filetype": mime_type,
            "filecontent": byte_io,
        }

        return file

    return _create_mock_audio


@pytest.fixture
def data_manager():
    """Fixture to initialize a DataManager instance.

    Returns:
        DataManager: A new instance of the DataManager class.
    """
    return DataManager()


class TestPreprocessAudio:
    """
    Test class for the PreprocessAudio class.
    This class contains tests for audio preprocessing methods such as segmentation.
    """

    def test_segmentation(self, data_manager, mock_audio_file):
        """
        Test the segmentation method of the PreprocessAudio class.

        This test ensures that the `segmentation` method properly processes an audio file and
        returns the correct segmented audio.

        Args:
            data_manager (DataManager): The DataManager instance responsible for loading and managing the audio.
            mock_audio_file (function): The fixture used to generate mock audio files for testing.

        Asserts:
            The test asserts that the segmentation result is correctly processed, though the assertion here is placeholder.
        """
        preprocess = PreprocessAudio()
        mock_file = mock_audio_file("mp3")
        data_manager.load_and_validate_audio(mock_file)
        duration = 10

        result = preprocess.segmentation(data_manager.audio_file, duration)

        assert True  # This is a placeholder assertion, should be replaced with actual checks
