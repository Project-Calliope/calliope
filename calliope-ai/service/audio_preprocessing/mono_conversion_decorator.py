"""
This module contains the `MonoConversionDecorator` class, which is responsible for converting
an audio file to mono. It extends the `AudioFileDecorator` class and overrides the `process` method
to ensure the audio has a single channel.

The `MonoConversionDecorator` can be applied to `AudioFile` instances to convert them into mono
format.

Classes:
    - MonoConversionDecorator: A class that processes and converts an audio file to mono.
"""

from pydub import AudioSegment
from service.audio_preprocessing.audio_file_decorator import AudioFileDecorator


class MonoConversionDecorator(AudioFileDecorator):
    """
    Decorator class that converts an audio file to mono.

    This class extends `AudioFileDecorator` and overrides the `process` method
    to ensure the audio has a single channel.
    """

    def process(self) -> AudioSegment:
        """
        Processes the audio file and converts it to mono.

        Returns:
            AudioSegment: The mono-converted audio segment.
        """
        audio = super().process()
        return audio.set_channels(1)
