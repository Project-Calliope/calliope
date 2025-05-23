"""
This module contains the `ResamplingDecorator` class, which is responsible for resampling audio
files to a 16kHz sampling rate.

The resampling process is commonly used in speech recognition systems like WHISPER and DeepSpeech,
which require a specific sampling rate for accurate transcription.

Classes:
    - ResamplingDecorator: A decorator class that resamples audio files to 16kHz.
"""

from pydub import AudioSegment
from service.audio_preprocessing.audio_file_decorator import AudioFileDecorator


class ResamplingDecorator(AudioFileDecorator):
    """
    Decorator class that resamples audio to 16kHz.

    This sampling rate is commonly used by speech recognition models
    such as WHISPER and DeepSpeech.
    """

    def process(self) -> AudioSegment:
        """
        Processes the audio file and resamples it to 16kHz.

        Returns:
            AudioSegment: The resampled audio segment with a 16kHz sampling rate.
        """
        audio = super().process()
        return audio.set_frame_rate(16000)
