from abc import ABC, abstractmethod
from pydub import AudioSegment

from fastapi import UploadFile
from service.audio_preprocessing.audio_file import AudioFile


class AudioFileDecorator(AudioFile):
    """
    Abstract class for the decorator pattern.
    """

    def __init__(self, audio_file: AudioFile):
        self._audio_file = audio_file

    @abstractmethod
    def process(self) -> AudioSegment:
        return self._audio_file.process()
