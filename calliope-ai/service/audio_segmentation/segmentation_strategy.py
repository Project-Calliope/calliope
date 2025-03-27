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
        pass
