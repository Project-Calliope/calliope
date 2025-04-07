import pytest
from pydub.generators import Sine
import os
from service.audio_segmentation.n_split_segmentation import NSplitSegmentation


@pytest.fixture
def test_audio():
    # 3 seconds sample
    sine_wave = Sine(440).to_audio_segment(duration=3000)
    test_file = "test_audio123456789.wav"
    sine_wave.export(test_file, format="wav")
    return str(test_file)


def test_nsplit_segmentation_creates_correct_number_of_segments(test_audio):
    n_segments = 3
    splitter = NSplitSegmentation(n_segments)
    result = splitter.segment(test_audio)

    # Original file deleted
    assert not os.path.exists(test_audio)
    # 3 segments created
    assert len(result) == n_segments

    # The return format is good
    assert result == {
        0: "test_audio123456789_part1.wav",
        1: "test_audio123456789_part2.wav",
        2: "test_audio123456789_part3.wav",
    }

    for i in range(n_segments):
        assert os.path.exists(result[i])
    # Deleting the test files
    for path in result.values():
        os.remove(path)
