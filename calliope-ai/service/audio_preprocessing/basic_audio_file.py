from pydub import AudioSegment
from service.audio_preprocessing.audio_file_decorator import AudioFile


class BasicAudioFile(AudioFile):
    """
    Class that process audio file without any modification
    """

    def __init__(self, audio_segment: AudioSegment):
        """
        Initializes the BasicAudioFile with an AudioSegment.
        """
        self.audio_segment = audio_segment

    def process(self) -> AudioSegment:
        """ "
        Returns the audio segment without any modification.
        """
        return self.audio_segment
