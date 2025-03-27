import pytest

from io import BytesIO
from pydub import AudioSegment, generators
from service.data_manager import DataManager
from service.audio_preprocessing.audio_file import AudioFile
from service.audio_preprocessing.audio_file_decorator import AudioFileDecorator
from service.audio_preprocessing.basic_audio_file import BasicAudioFile
from service.audio_preprocessing.mono_conversion_decorator import (
    MonoConversionDecorator,
)
from service.audio_preprocessing.resampling_decorator import ResamplingDecorator


@pytest.fixture
def mock_audio_file():
    """
    Fixture to create a mock audio file with alternating sound and silence in WAV format.

    This fixture generates a mock audio file with alternating sine wave sounds and silence
    to simulate audio data. The file can be generated in different formats (e.g., WAV, MP3, M4A).

    Returns:
        function: A function to create a mock audio file in the specified format.
    """

    def _create_mock_audio(format):
        """
        Create a mock audio file in the specified format with alternating sound and silence.

        Parameters:
            format (str): The format in which to generate the audio file (e.g., 'wav', 'mp3', 'm4a').

        Returns:
            dict: A dictionary containing the mock audio file's name, type, and content.
        """
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

    This fixture creates and returns a fresh instance of the DataManager class, which is
    responsible for managing and processing audio files.

    Returns:
        DataManager: An instance of the DataManager class.
    """
    return DataManager()


class TestAudioProcessing:

    def test_preprocessing(self, mock_audio_file, data_manager):
        """
        Test the preprocessing method of the AudioProcessor class.

        This test verifies that the audio file can be loaded and processed correctly.
        It checks that after applying the MonoConversionDecorator and ResamplingDecorator,
        the audio file has the expected properties such as a single channel (mono),
        a frame rate of 16000, and a sample width of 2 bytes.

        Parameters:
            mock_audio_file (function): The fixture that generates the mock audio file.
            data_manager (DataManager): The fixture providing an instance of DataManager.
        """
        audio_file = mock_audio_file("wav")
        data_manager.load_and_validate_audio(audio_file)

        audio_segment = AudioSegment.from_file(data_manager.audio_file)

        audio = BasicAudioFile(audio_segment)
        mono_audio = MonoConversionDecorator(audio)
        resampled_audio = ResamplingDecorator(mono_audio)

        processed_audio = resampled_audio.process()

        assert processed_audio.channels == 1
        assert processed_audio.frame_rate == 16000
        assert processed_audio.sample_width == 2
