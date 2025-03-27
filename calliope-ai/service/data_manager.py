"""
This module contains the DataManager class, which is responsible for managing
the audio data used in the transcription process.
"""

from pydub import AudioSegment
from tempfile import NamedTemporaryFile

from service.audio_preprocessing.basic_audio_file import BasicAudioFile
from service.audio_preprocessing.resampling_decorator import ResamplingDecorator
from service.audio_preprocessing.mono_conversion_decorator import (
    MonoConversionDecorator,
)
from service.audio_segmentation.fixed_duration_segment import FixedDurationSegmentation
from service.audio_segmentation.audio_processor import AudioProcessor


class DataManager:
    """ "
    Class to manage audio data for transcription.
    """

    def __init__(self):
        """
        Initializes the DataManager instance.
        It will hold the audio file and its segmented parts.
        """
        self.audio_file = None
        self.segmented_audio = []

    # setter

    @property
    def audio(self):
        return self._audio

    @audio.setter
    def audio(self, audio_file: UploadFile):
        self._audio = audio_file

    @property
    def segmented_audio(self):
        return self._segmented_audio

    @segmented_audio.setter
    def segmented_audio(self, segmented_audio):
        self._segmented_audio = segmented_audio

    def load_audio(self, audio_file: UploadFile):
        """
        Loads the audio file into the DataManager.

        Parameters:
            audio_file (FileStorage): The audio file to be loaded.
        """
        self.audio_file = file

    def validate_data(self):
        """
        Validate that the audio file is valid (correct format and readable).
        This method differentiates between:
        - Valid audio files (formats recognized and readable)
        - Corrupted files or unreadable files (raises CouldntDecodeError)
        """
        if self.audio_file is None:
            raise ValueError("No audio file loaded")

        try:
            audio = AudioSegment.from_file(self.audio_file["filecontent"])
            self.audio_file = tmp_file = NamedTemporaryFile(delete=False)
            tmp_file.write(audio.export(format="wav").read())
            tmp_file.close()
            return True

        except Exception as e:
            print("Error validating audio data:", e)
            return False

    def preprocess_audio_segments(self):
        """
        Placeholder for the audio preprocessing method, such as splitting
        the audio into smaller parts.
        (To be implemented later.)
        """
        if self.segmented_audio == []:
            self.segmented_audio = [AudioSegment.from_file(self.audio.file)]
        else:
            l = []
            for x in self.segmented_audio:
                audio_file = BasicAudioFile(x)
                audio_file = ResamplingDecorator(audio_file)
                audio_file = MonoConversionDecorator(audio_file)
                preprocessed_segment = audio_file.process()
                l.append(preprocessed_segment)
            self.segmented_audio = l

    def get_segmented_audio(self):
        """
        Returns the segmented audio parts after preprocessing.

        Returns:
            list: A list of the segmented audio files.
        """
        return self.segmented_audio

    def segment_audio(self, duration=100):
        """
        Segments the audio into smaller parts of the specified duration.

        Parameters:
            duration (int): The duration of each segment in seconds.
        """

        segmentation_strategy = FixedDurationSegmentation(duration_ms=duration)
        audio_processor = AudioProcessor(self.audio, segmentation_strategy)

        print("_______________________________")
        print("Segmenting audio...")

        segments = audio_processor.preprocess_audio()

        self.segmented_audio = segments
        print("Audio segmented into", len(segments), "parts.")
