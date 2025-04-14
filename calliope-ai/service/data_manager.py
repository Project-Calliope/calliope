"""
This module contains the DataManager class, which is responsible for managing
the audio data used in the transcription process.
"""

from tempfile import NamedTemporaryFile

from pydub import AudioSegment
from pydub.exceptions import CouldntDecodeError

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

            with NamedTemporaryFile(delete=False) as tmp_file:
                tmp_file.write(audio.export(format="wav").read())
                self.audio_file = tmp_file.name

            return True

        except CouldntDecodeError as e:
            print(f"Error occurred while loading the audio: {e}")
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
