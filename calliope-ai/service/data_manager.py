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
    """
    Class to manage audio data for transcription.
    """

    def __init__(self):
        """
        Initializes the DataManager instance.
        It will hold the audio file and its segmented parts.
        """
        self.audio_name = None
        self.audio_type = None
        self.audio_file = None
        self.segmented_audio = []

    @property
    def audio_name(self):
        return self._audio_name

    @audio_name.setter
    def audio_name(self, audio_name):
        self._audio_name = audio_name

    @property
    def audio_type(self):
        return self._audio_type

    @audio_type.setter
    def audio_type(self, audio_type):
        self._audio_type = audio_type

    @property
    def audio_file(self):
        return self._audio_file

    @audio_file.setter
    def audio_file(self, audio_file):
        self._audio_file = audio_file

    @property
    def segmented_audio(self):
        return self._segmented_audio

    @segmented_audio.setter
    def segmented_audio(self, segmented_audio):
        self._segmented_audio = segmented_audio

    def load_and_validate_audio(self, file):
        """
        Loads the audio file into the DataManager.

        Args:
            file : The audio file to be loaded.

        Returns:
            bool: True if the audio file is successfully loaded and validated,
                  False otherwise.
        """

        if file["filecontent"] is None:
            raise ValueError("No audio file loaded")

        try:
            self.audio_name = file["filename"]
            self.audio_type = file["filetype"]

            audio = AudioSegment.from_file(file["filecontent"])

            tmp_file = NamedTemporaryFile(delete=False)
            tmp_file.write(audio.export(format="wav").read())

            self.audio_file = tmp_file.name

            tmp_file.close()

            return True

        except Exception as e:
            print("Error validating audio data:", e)
            return False

    def preprocess_audio_segments(self):
        """
        Preprocess the audio segments, such as resampling and mono conversion.

        If the audio has not been segmented yet, it will process the full audio file.
        Otherwise, it will preprocess each segment.
        """
        if self.segmented_audio == []:
            self.segmented_audio = [AudioSegment.from_file(self.audio_file)]
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

        Args:
            duration (int): The duration of each segment in milliseconds.
        """
        segmentation_strategy = FixedDurationSegmentation(duration_ms=duration)
        audio_processor = AudioProcessor(self.audio_file, segmentation_strategy)

        print("_______________________________")
        print("Segmenting audio...")

        segments = audio_processor.preprocess_audio()

        self.segmented_audio = segments
        print("Audio segmented into", len(segments), "parts.")
