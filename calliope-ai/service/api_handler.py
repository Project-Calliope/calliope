"""
APIHandler Module

This module handles requests related to audio transcription via an API. It uses a DataManager
to load and validate audio files, then performs transcription to text using a ModelManager.
"""

from service.data_manager import DataManager
from service.model_manager import ModelManager
from pydub import AudioSegment


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

        This method also creates a `model` attribute that can be used for transcription,
        although the model integration is not yet implemented.
        """
        self.data_manager = DataManager()
        self.model_manager = ModelManager()
        self.model_manager.load_model()

    def transcribe(self, file):
        """
        Transcribes an audio file to text.

        This method loads the audio file, validates its compliance, and performs the transcription.

        Parameters:
            audio_file (Uploadfile): The audio file to be transcribed.

        Returns:
            tuple: A tuple containing a boolean indicating whether the transcription succeeded,
                   and a return message explaining the result.
                   - True, "Transcription" if the transcription succeeds.
                   - False, error message if the file is corrupted or in an unsupported format.
        """

        self.data_manager.load_audio(file)

        valid_audio = self.data_manager.validate_data()

        if not valid_audio:
            return False, "Audio file is corrupted or in an unsupported format."

        return True, self.model_manager.predict(self.data_manager.audio)
