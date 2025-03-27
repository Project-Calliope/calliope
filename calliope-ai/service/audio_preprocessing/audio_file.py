"""
This module contains the `AudioFile` abstract base class, which defines the interface for audio
file processing.

The `AudioFile` class ensures that all derived classes implement the `process` method, which is
responsible for processing and returning an audio segment. This class is intended to be used as a
base for applying the decorator pattern and creating various audio file transformations.

Classes:
    - AudioFile: An abstract base class for audio file processing, requiring the implementation of
    the `process` method.
"""

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
