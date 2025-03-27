"""
This module contains the `FixedDurationSegmentation` class, which implements a segmentation
strategy that divides an audio file into segments of a fixed duration (in milliseconds). This
strategy ensures that each segment has the same duration, providing consistent chunks of the
original audio.

Classes:
    - FixedDurationSegmentation: A class that segments an audio file into fixed-duration chunks.
"""

from pydub import AudioSegment
from service.audio_segmentation.segmentation_strategy import SegmentationStrategy


class FixedDurationSegmentation(SegmentationStrategy):
    """
    Class for segmenting audio based on a fixed duration.

    This class implements a segmentation strategy that divides the audio
    into segments of a fixed duration (in milliseconds). Each segment
    will contain a chunk of the original audio, ensuring consistent duration.

    Attributes:
        duration_ms (int): The duration of each segment in milliseconds.
    """

    def __init__(self, duration_ms=10000):
        """
        Initializes the segmentation strategy with a fixed duration.

        Args:
            duration_ms (int, optional): The duration of each segment in milliseconds. Defaults to
            10000 (10 seconds).
        """
        self.duration_ms = duration_ms

    def segment(self, audio_file) -> list:
        """
        Segments the provided audio file into chunks based on the fixed duration.

        Args:
            audio (str): Path to the audio file to be segmented.

        Returns:
            list: A list of AudioSegment objects representing the segmented audio.
        """
        print("FixedDurationSegmentation")
        audio = AudioSegment.from_file(audio_file)
        segments = []
        for i in range(0, len(audio), self.duration_ms):
            segments.append(audio[i : i + self.duration_ms])
        return segments
