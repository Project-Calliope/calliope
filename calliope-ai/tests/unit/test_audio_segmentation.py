import pytest

from io import BytesIO
from pydub import AudioSegment, generators
from service.data_manager import DataManager
from service.audio_segmentation.silence_based_segmentation import (
    SilenceBasedSegmentation,
)
from service.audio_segmentation.fixed_duration_segment import FixedDurationSegmentation
from service.audio_segmentation.audio_processor import AudioProcessor


@pytest.fixture
def mock_audio_file():
    """
    Fixture to create a mock audio file with alternating sound and silence in WAV format.

    This fixture generates a mock audio file with alternating sine wave sounds and silence,
    simulating real-world audio data. The file can be created in various formats, including WAV,
    MP3, and M4A.

    Returns:
        function: A function to generate a mock audio file in the specified format.
    """

    def _create_mock_audio(format):
        """
        Create a mock audio file in the specified format with alternating sound and silence.

        Parameters:
            format (str): The format in which to generate the audio file (e.g., 'wav', 'mp3', 'm4a').

        Returns:
            dict: A dictionary containing the mock audio file's name, type, and content.
        """
        # Create an audio segment with alternating sound and silence
        sound = (
            generators.Sine(440)
            .to_audio_segment(duration=5000, volume=-20)
            .fade_out(100)
        )
        silence = AudioSegment.silent(duration=5000)

        audio = sound + silence + sound + silence + sound

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
            "filename": f"mockfile.{format}",
            "filetype": mime_type,
            "filecontent": byte_io,
        }

        return file

    return _create_mock_audio


@pytest.fixture
def data_manager():
    """
    Fixture to initialize a DataManager instance.

    This fixture creates and returns a fresh instance of the DataManager class, which handles
    loading and managing audio files for processing.

    Returns:
        DataManager: A new instance of the DataManager class.
    """
    return DataManager()


class TestAudioSegmentation:

    def test_segmentation_silence(self, data_manager, mock_audio_file):
        """
        Test the segmentation using SilenceBasedSegmentation.

        This test verifies that the `AudioProcessor` can correctly segment an audio file
        using the `SilenceBasedSegmentation` strategy. It ensures that the resulting segments
        are valid `AudioSegment` instances and that segmentation occurs.

        Parameters:
            data_manager (DataManager): The fixture that provides a DataManager instance.
            mock_audio_file (function): The fixture that creates a mock audio file.
        """
        audio_file = mock_audio_file("wav")
        data_manager.load_and_validate_audio(audio_file)

        segmentation_strategy = SilenceBasedSegmentation()
        audio_processor = AudioProcessor(data_manager.audio_file, segmentation_strategy)

        segments = audio_processor.preprocess_audio()

        assert len(segments) > 0, "No segments were created."
        assert all(
            isinstance(segment, AudioSegment) for segment in segments
        ), "Not all segments are AudioSegment instances."

    def test_segmentation_duration(self, data_manager, mock_audio_file):
        """
        Test the segmentation using FixedDurationSegmentation.

        This test checks whether the `AudioProcessor` can correctly segment an audio file
        into fixed-duration segments. It verifies that all segments (except possibly the last one)
        have the correct duration in milliseconds.

        Parameters:
            data_manager (DataManager): The fixture that provides a DataManager instance.
            mock_audio_file (function): The fixture that creates a mock audio file.
        """
        audio_file = mock_audio_file("wav")
        data_manager.load_and_validate_audio(audio_file)

        segmentation_strategy = FixedDurationSegmentation(duration_ms=5000)
        audio_processor = AudioProcessor(data_manager.audio_file, segmentation_strategy)

        segments = audio_processor.preprocess_audio()

        assert len(segments) > 0, "No segments were created."
        assert all(
            isinstance(segment, AudioSegment) for segment in segments
        ), "Not all segments are AudioSegment instances."

        for segment in segments[:-1]:
            assert len(segment) == 5000, "Segment duration is not correct."
