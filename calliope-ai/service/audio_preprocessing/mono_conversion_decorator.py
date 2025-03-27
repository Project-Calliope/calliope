from service.audio_preprocessing.audio_file_decorator import AudioFileDecorator
from pydub import AudioSegment


class MonoConversionDecorator(AudioFileDecorator):
    """
    Class that convert audio to mono
    """

    def process(self) -> AudioSegment:

        audio = super().process()
        return audio.set_channels(1)
