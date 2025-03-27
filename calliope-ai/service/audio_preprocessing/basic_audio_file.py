"""
This module contains the `BasicAudioFile` class, which represents a basic audio file
that undergoes no modification. It simply returns the provided audio segment as is.

The class implements the `AudioFile` interface and serves as a base for more complex
audio file transformations or decorators.

Classes:
    - BasicAudioFile: A class that processes and returns the raw audio segment without
    modification.
"""

from pydub import AudioSegment
from service.audio_preprocessing.audio_file_decorator import AudioFile


class BasicAudioFile(AudioFile):
    """
    Class representing a basic audio file that undergoes no modification.

    This class implements the `AudioFile` interface and simply returns
    the provided audio segment as is.

    Attributes:
        audio_segment (AudioSegment): The raw audio data.
    """

    def __init__(self, audio_segment: AudioSegment):
        """
        Initializes the BasicAudioFile with an AudioSegment.

        Args:
            audio_segment (AudioSegment): The audio data to be processed.
        """
        self.audio_segment = audio_segment

    def process(self) -> AudioSegment:
        """
        Returns the audio segment without any modification.

        Returns:
            AudioSegment: The original, unmodified audio segment.
        """
        return self.audio_segment
