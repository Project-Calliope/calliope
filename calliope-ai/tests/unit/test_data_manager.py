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

        Args:
            format (str): The audio format to create (e.g., 'mp3', 'wav', 'm4a').
            duration (int, optional): The duration of the silent audio in milliseconds (default is 100ms).

        Returns:
            dict: A dictionary containing the mock audio file's filename, filetype, and file content.
        """
        audio = AudioSegment.silent(duration)  # Default to 100ms

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
    """Fixture to initialize a DataManager instance.

    Returns:
        DataManager: A DataManager instance used to manage audio data.
    """
    return DataManager()


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_load_audio(data_manager, mock_audio_file, audio_format):
    """Test the loading of audio files in various formats.

    Args:
        data_manager (DataManager): The DataManager instance used to load and validate the audio.
        mock_audio_file (function): Fixture function to create mock audio files.
        audio_format (str): The audio format to test (e.g., 'wav', 'mp3', 'm4a').

    Asserts:
        The test asserts that the DataManager correctly loads and validates the audio file and its metadata.
    """
    mock_file = mock_audio_file(audio_format)
    data_manager.load_and_validate_audio(mock_file)

    assert data_manager.audio_name == f"test_audio.{audio_format}"
    assert data_manager.audio_type == f"audio/{audio_format}"
    assert data_manager.audio_file is not None


@pytest.mark.parametrize("audio_format", ["wav", "mp3", "m4a"])
def test_validate_data_valid_audio(data_manager, mock_audio_file, audio_format):
    """Test the validation of valid audio files.

    Args:
        data_manager (DataManager): The DataManager instance.
        mock_audio_file (function): Fixture function to create mock audio files.
        audio_format (str): The audio format to test.

    Asserts:
        The test asserts that the audio file is valid and passes the validation.
    """
    mock_file = mock_audio_file(audio_format)
    result = data_manager.load_and_validate_audio(mock_file)

    assert result is True


def test_validate_data_audio_invalid(data_manager):
    """Test the validation of corrupted audio files.

    Args:
        data_manager (DataManager): The DataManager instance.

    Asserts:
        The test asserts that the corrupted audio file fails the validation and returns False.
    """
    corrupted_data = BytesIO(b"corrupted data")
    mock_file = {
        "filename": "invalid_audio.mp3",
        "filetype": "audio/mp3",
        "filecontent": corrupted_data,
    }

    result = data_manager.load_and_validate_audio(mock_file)

    assert result is False


@pytest.mark.parametrize("format", ["txt", "jpg", "mp4"])
def test_validate_data_audio_formats(data_manager, mock_audio_file, format):
    """Test the validation of unsupported audio formats.

    Args:
        data_manager (DataManager): The DataManager instance.
        mock_audio_file (function): Fixture function to create mock audio files.
        format (str): The unsupported format to test.

    Asserts:
        The test asserts that unsupported formats are rejected, and validation returns False.
    """
    mock_file = mock_audio_file(format)

    result = data_manager.load_and_validate_audio(mock_file)

    assert result is False


def test_preprocess_audio_segments(data_manager, mock_audio_file):
    """Test the preprocessing of audio segments.

    Args:
        data_manager (DataManager): The DataManager instance.
        mock_audio_file (function): Fixture function to create mock audio files.

    Asserts:
        The test asserts that the audio file is successfully processed and the segmented audio is returned.
    """
    audio_file = mock_audio_file("wav")
    data_manager.load_and_validate_audio(audio_file)
    data_manager.preprocess_audio_segments()

    segments = data_manager.get_segmented_audio()

    assert len(segments) == 1
    assert isinstance(segments[0], AudioSegment)


def test_preprocess_audio(data_manager, mock_audio_file):
    """Test the preprocessing of multiple audio segments.

    Args:
        data_manager (DataManager): The DataManager instance.
        mock_audio_file (function): Fixture function to create mock audio files.

    Asserts:
        The test asserts that the audio file is successfully processed and the segmented audio is returned.
    """
    audio_file = mock_audio_file("wav", duration=30000)

    data_manager.load_and_validate_audio(audio_file)
    data_manager.preprocess_audio_segments()

    segments = data_manager.get_segmented_audio()

    assert len(segments) == 1
    assert isinstance(segments[0], AudioSegment)


def test_preprocess_audio_segments_multiple(data_manager, mock_audio_file):
    """Test the preprocessing of multiple audio segments based on a duration split.

    Args:
        data_manager (DataManager): The DataManager instance.
        mock_audio_file (function): Fixture function to create mock audio files.

    Asserts:
        The test asserts that the audio file is successfully split into multiple segments based on the duration.
    """
    audio_file = mock_audio_file("wav", duration=30000)

    data_manager.load_and_validate_audio(audio_file)

    data_manager.segment_audio(duration=10000)

    segments = data_manager.get_segmented_audio()

    assert len(segments) == 3
    assert isinstance(segments[0], AudioSegment)
    assert isinstance(segments[1], AudioSegment)
    assert isinstance(segments[2], AudioSegment)
