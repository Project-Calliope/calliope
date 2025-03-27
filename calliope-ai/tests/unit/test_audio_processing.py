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
    """Fixture to create a mock audio file with alternating sound and silence in WAV format."""

    def _create_mock_audio(format):
        """Create a mock audio file in the specified format with alternating sound and silence."""
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
            "filename": f"mockfile.wav",
            "filetype": mime_type,
            "filecontent": byte_io,
        }

        return file

    return _create_mock_audio


@pytest.fixture
def data_manager():
    """Fixture to initialize a DataManager instance."""
    return DataManager()


class TestAudioProcessing:

    def test_preprocessing(self, mock_audio_file, data_manager):
        """Test the preprocessing method of the AudioProcessor class."""
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
