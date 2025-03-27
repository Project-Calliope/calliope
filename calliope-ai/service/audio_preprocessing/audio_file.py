from abc import ABC, abstractmethod
from pydub import AudioSegment


class AudioFile(ABC):
    """
    Interface for the decorator pattern.
    """

    @abstractmethod
    def process(self) -> AudioSegment:
        pass
