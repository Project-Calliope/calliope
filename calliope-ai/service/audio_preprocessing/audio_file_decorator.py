"""
This module contains the `AudioFileDecorator` abstract base class, which implements the decorator
pattern for `AudioFile`.

The `AudioFileDecorator` class serves as a wrapper for `AudioFile` instances, allowing additional
processing steps to be added dynamically. It provides an abstract `process` method that subclasses
must implement, enabling flexible audio file transformations.

Classes:
    - AudioFileDecorator: Abstract base class for creating decorators that wrap `AudioFile`
    instances.
"""

from abc import abstractmethod
from pydub import AudioSegment
from service.audio_preprocessing.audio_file import AudioFile


class AudioFileDecorator(AudioFile):
    """
    Abstract base class implementing the decorator pattern for `AudioFile`.

    This class serves as a wrapper for `AudioFile` instances, allowing
    additional processing steps to be added dynamically.

    Attributes:
        _audio_file (AudioFile): The wrapped `AudioFile` instance.
    """

    def __init__(self, audio_file: AudioFile):
        """
        Initializes the decorator with an `AudioFile` instance.

        Args:
            audio_file (AudioFile): The `AudioFile` instance to decorate.
        """
        self._audio_file = audio_file

    @abstractmethod
    def process(self) -> AudioSegment:
        """
        Abstract method for processing audio.

        Returns:
            AudioSegment: The processed audio segment.
        """
        return self._audio_file.process()
