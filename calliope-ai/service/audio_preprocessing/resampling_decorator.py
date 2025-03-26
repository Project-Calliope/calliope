from service.audio_preprocessing.audio_file_decorator import AudioFileDecorator
from pydub import AudioSegment


class ResamplingDecorator(AudioFileDecorator):
    """
    Class that resample audio to 16kHz : Sampling rate used by the majority of models
    like WHISPER and DeepSpeech
    """

    def process(self) -> AudioSegment:
        """
        Returns the audio segment resampled to 16kHz.
        """
        audio = super().process()
        return audio.set_frame_rate(16000)
