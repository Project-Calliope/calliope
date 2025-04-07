"""
APIHandler Module

This module handles requests related to audio transcription via an API. It uses a DataManager
to load and validate audio files, then performs transcription to text using a ModelManager.
"""

from service.data_manager import DataManager
from service.model_manager import ModelManager
from pydub import AudioSegment
from service.audio_segmentation.audio_processor import AudioProcessor
from service.audio_segmentation.n_split_segmentation import NSplitSegmentation

class APIHandler:
    """
    Class that handles audio transcription requests.

    This class uses a DataManager object to load, validate, and process audio files
    for transcription to text. It provides a method to transcribe an audio file into raw text.

    Attributes:
        data_manager (DataManager): The object used to load and validate audio files.
        model_manager (ModelManager): The object used for transcription.
    """

    def __init__(self):
        """
        Initializes the APIHandler with a DataManager for handling audio files.

        This method also creates a `model_manager` attribute that can be used for transcription,
        although the model integration is not yet implemented.
        """
        self.data_manager = DataManager()
        self.model_manager = ModelManager()
        self.model_manager.load_model()

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

        duration_threshold = 400000 #400s
        if duration_ms > duration_threshold:
            audio_processor = AudioProcessor(self.data_manager.audio_file, NSplitSegmentation(5))
            segments = audio_processor.preprocess_audio()
            return True, self.model_manager.predict_parallel(segments)

        return True, self.model_manager.predict(self.data_manager.audio_file)
