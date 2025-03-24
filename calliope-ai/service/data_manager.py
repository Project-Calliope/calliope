"""
This module contains the DataManager class, which is responsible for managing
the audio data used in the transcription process.
"""

from pydub import AudioSegment
from fastapi import UploadFile


class DataManager:
    """ "
    Class to manage audio data for transcription.
    """

    def __init__(self):
        """
        Initializes the DataManager instance.
        It will hold the audio file and its segmented parts.
        """
        self.audio = None
        self.segmented_audio = []

    def load_audio(self, audio_file: UploadFile):
        """
        Loads the audio file into the DataManager.

        Parameters:
            audio_file (FileStorage): The audio file to be loaded.
        """
        self.audio = audio_file

    def validate_data(self):
        """
        Validate that the audio file is valid (correct format and readable).
        This method differentiates between:
        - Valid audio files (formats recognized and readable)
        - Corrupted files or unreadable files (raises CouldntDecodeError)
        """
        if self.audio is None:
            raise ValueError("No audio file loaded")

        try:
            AudioSegment.from_file(self.audio.file)
            return True

        except Exception as e:
            print("Error validating audio data:", e)
            return False

    def preprocess_audio(self):
        """
        Placeholder for the audio preprocessing method, such as splitting
        the audio into smaller parts.
        (To be implemented later.)
        """
        pass

    def get_segmented_audio(self):
        """
        Returns the segmented audio parts after preprocessing.

        Returns:
            list: A list of the segmented audio files.
        """
        return self.segmented_audio
