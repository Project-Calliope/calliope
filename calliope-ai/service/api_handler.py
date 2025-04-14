"""
APIHandler Module

This module handles requests related to audio transcription via an API. It uses a DataManager
to load and validate audio files, then performs transcription to text using a ModelManager.
"""

from service.data_manager import DataManager
from service.model_transcribe_manager import ModelTranscribeManager
from pydub import AudioSegment
from service.audio_segmentation.audio_processor import AudioProcessor
from service.audio_segmentation.n_split_segmentation import NSplitSegmentation
from service.model_summarize_manager import ModelSummarizeManager


class APIHandler:
    """
    Class that handles audio transcription requests.

    This class uses a DataManager object to load, validate, and process audio files
    for transcription to text. It provides a method to transcribe an audio file into raw text.

    Attributes:
        data_manager (DataManager): The object used to load and validate audio files.
        model_transcribe_manager (ModelTranscribeManager): The object used for transcription.
    """

    def __init__(self):
        """
        Initializes the APIHandler with a DataManager for handling audio files.

        This method also creates a `model_transcribe_manager` attribute that can be used for transcription,
        although the model integration is not yet implemented.
        """
        self.data_manager = DataManager()
        self.model_transcribe_manager = ModelTranscribeManager()
        self.model_summarize_manager = ModelSummarizeManager()
        self.model_transcribe_manager.load_model()

    def transcribe(self, file):
        """
        Transcribes an audio file to text.

        This method loads the audio file, validates its compliance, and performs the transcription.

        Args:
            file (UploadFile): The audio file to be transcribed.

        Returns:
            tuple: A tuple containing a boolean indicating whether the transcription succeeded,
                   and a return message explaining the result.
                   - True, "Transcription" if the transcription succeeds.
                   - False, error message if the file is corrupted or in an unsupported format.
        """
        loading_and_validation_success = self.data_manager.load_and_validate_audio(file)

        if not loading_and_validation_success:
            return False, "Audio file is corrupted or in an unsupported format."

        audio = AudioSegment.from_file(self.data_manager.audio_file)
        duration_ms = len(audio)

        duration_threshold = 400000  # 400s
        if duration_ms > duration_threshold:
            audio_processor = AudioProcessor(
                self.data_manager.audio_file, NSplitSegmentation(5)
            )
            segments = audio_processor.preprocess_audio()
            return True, self.model_transcribe_manager.predict_parallel(segments)

        return True, self.model_transcribe_manager.predict_transcription(
            self.data_manager.audio_file
        )

    def summarize(self, text):
        """
        Summarizes the provided text.

        Args:
            text (str): The text to be summarized.

        Returns:
            str: The summarized text.
        """
        if not text.strip():
            return False, "Text is required"

        return True, self.model_summarize_manager.predict_summary(text)
