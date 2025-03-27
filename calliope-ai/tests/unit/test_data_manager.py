import pytest

from pydub import AudioSegment
from fastapi import UploadFile

from io import BytesIO
from service.data_manager import DataManager


@pytest.fixture
def mock_audio_file():
    """Fixture to create a mock audio file in various formats (mp3, wav, m4a)."""

    def _create_mock_audio(format, duration=100):
        """Create a mock audio file in the specified format.

        param :
            format: audio format to create
        """

        audio = AudioSegment.silent(duration)  # 100ms

        byte_io = BytesIO()

        format_dict = {
            "mp3": ("mp3", "audio/mp3"),
            "wav": ("wav", "audio/wav"),
            "m4a": ("ipod", "audio/m4a"),
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
    """Fixture to initialize a DataManager instance."""
    return DataManager()


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_load_audio(data_manager, mock_audio_file, audio_format):
    """Test the loading of audio files in various formats.

    param :
        data_manager: DataManager instance (fixture)
        mock_audio_file: mock_audio_file fixture
        audio_format: audio format to test
    """

    mock_file = mock_audio_file(audio_format)
    data_manager.load_audio(mock_file)

    assert data_manager.audio_file is not None
    assert data_manager.audio_file["filename"] == f"test_audio.{audio_format}"
    assert data_manager.audio_file["filetype"] == f"audio/{audio_format}"
    assert data_manager.audio_file["filecontent"] == mock_file["filecontent"]


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


def test_preprocess_audio_segments(data_manager, mock_audio_file):
    """Test the preprocessing of audio segments."""
    audio_file = mock_audio_file("wav")
    data_manager.load_audio(audio_file)
    data_manager.preprocess_audio_segments()

    segments = data_manager.get_segmented_audio()

    assert len(segments) == 1
    assert isinstance(segments[0], AudioSegment)


def test_preprocess_audio(data_manager, mock_audio_file):
    """Test the preprocessing of multiple audio segments."""
    audio_file = mock_audio_file("wav", duration=30000)

    data_manager.load_audio(audio_file)
    data_manager.preprocess_audio_segments()

    segments = data_manager.get_segmented_audio()

    assert len(segments) == 1
    assert isinstance(segments[0], AudioSegment)


def test_preprocess_audio_segments_multiple(data_manager, mock_audio_file):
    audio_file = mock_audio_file("wav", duration=30000)

    data_manager.load_audio(audio_file)

    data_manager.segment_audio(duration=10000)

    segments = data_manager.get_segmented_audio()
    print("but pb just here")

    assert len(segments) == 3
    assert isinstance(segments[0], AudioSegment)
    assert isinstance(segments[1], AudioSegment)
    assert isinstance(segments[2], AudioSegment)
