from abc import ABC, abstractmethod
from pydub import AudioSegment


class AudioFile(ABC):
    """
    Abstract base class defining the interface for audio file processing.

    This class is used as a base for applying the decorator pattern,
    ensuring that all derived classes implement the `process` method.
    """

    @abstractmethod
    def process(self) -> AudioSegment:
        """
        Abstract method to process an audio file.

        Returns:
            AudioSegment: The processed audio segment.
        """
        pass
