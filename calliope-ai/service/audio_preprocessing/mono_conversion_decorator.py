from service.audio_preprocessing.audio_file_decorator import AudioFileDecorator
from pydub import AudioSegment


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
