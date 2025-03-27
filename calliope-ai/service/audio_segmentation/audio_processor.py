"""
This module defines the `AudioProcessor` class responsible for processing audio data
using a specified segmentation strategy.

The class applies different segmentation strategies to divide the audio file into manageable
segments for further processing or analysis.

Classes:
    AudioProcessor: Processes the provided audio file using a selected segmentation strategy.
"""

from service.audio_segmentation.segmentation_strategy import SegmentationStrategy


class AudioProcessor:
    """
    Class to process audio data using a segmentation strategy.

    This class applies a segmentation strategy to divide an audio file into segments
    for further processing.

    Attributes:
        audio: The audio data to be processed.
        segmentation_strategy (SegmentationStrategy): The strategy used to segment the audio.
    """

    def __init__(self, audio, segmentation_strategy: SegmentationStrategy):
        """
        Initializes the AudioProcessor with an audio file and a segmentation strategy.

        Args:
            audio: The audio data to be processed.
            segmentation_strategy (SegmentationStrategy): The segmentation strategy to apply.
        """
        self.audio = audio
        self.segmentation_strategy = segmentation_strategy

    def preprocess_audio(self):
        """
        Preprocesses the audio using the selected segmentation strategy.

        Returns:
            list: A list of segmented audio parts.
        """
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        print("All good here")
        segments = self.segmentation_strategy.segment(self.audio)
        print("Not here")
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        return segments
