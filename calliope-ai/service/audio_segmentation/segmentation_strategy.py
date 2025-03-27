"""
This module contains the `SegmentationStrategy` class, which defines an abstract base class
for audio segmentation strategies. Subclasses of `SegmentationStrategy` must implement the
`segment` method to define how an audio file should be segmented based on different criteria.

Classes:
    - SegmentationStrategy: An abstract base class for defining audio segmentation strategies.
"""

from abc import ABC, abstractmethod


class SegmentationStrategy(ABC):
    """
    Abstract class for audio file segmentation (Strategy Pattern).

    This class defines the interface for the segmentation strategy. Subclasses
    should implement the `segment` method to define how the audio file should
    be segmented.

    Methods:
        segment(audio_file): Segments the provided audio file.
    """

    @abstractmethod
    def segment(self, audio_file):
        """
        Segments the provided audio file.

        Args:
            audio_file: The audio file to be segmented.
        """
