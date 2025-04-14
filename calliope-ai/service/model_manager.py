"""
This module contains classes to handle audio transcription using the Whisper model.

The `Model` class is responsible for loading the Whisper model and performing audio transcription.
It uses the Whisper model to transcribe audio files into text and manages temporary file removal
after transcription.

The `ModelManager` class manages the `Model` instance, providing an interface for loading the model
and making predictions. The model is loaded only when needed, and it allows for the transcription
of audio files through the `predict` method.

Usage:
    - Load the model using `ModelManager.load_model()`.
    - Use `ModelManager.predict(data)` to transcribe an audio file, where `data` is the file path to
    the audio.

Dependencies:
    - whisper (for transcription)
    - os (for file management)
"""

import os
import whisper
from joblib import Parallel, delayed


class Model:
    """
    Class to handle transcription using the Whisper model.
    """

    _instance = None

    def __new__(cls):   # Making sure it is a singleton
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        """
        Initializes the model by loading the 'small' version of the Whisper model.
        """
        if self._initialized :
            return
        else:
            self._initialized = True
            self.model = whisper.load_model("small")

    def predict(self, input_data):
        """
        Transcribes the input audio file into text.

        Args:
            input_data (str): Path to the audio file to be transcribed.

        Returns:
            str: The transcribed text.
        """
        tr = self.model.transcribe(input_data)["text"]

        os.unlink(input_data)

        return tr

    def predict_parallel(self, input_data: dict, n_jobs=-1):
        """
        Transcribes the segmented input audio file into text using parallelisation for faster processing. Ideal on long conversations.

        Args:
            input_data (dict): A dictionary containing the path to each segment of the audio file to be transcribed.

        Returns:
            str: The transcribed text.
        """

        def transcribe_segment(segment_index):
            return segment_index, self.predict(input_data[segment_index])

        results = Parallel(n_jobs=n_jobs)(
            delayed(transcribe_segment)(index) for index in input_data.keys()
        )

        output = dict(results)
        final_output = ""
        for i in sorted(output.keys()):
            final_output += output[i]
        return final_output


class ModelManager:
    """
    Manages the model and handles the prediction process.

    This class provides an interface for loading and using the Whisper model
    for audio transcription. The model is loaded only when required, and
    predictions can be made on audio files through the `predict` method.
    """
    
    def __init__(self):
        """
        Initializes the ModelManager instance without a model initially.
        """
        self.model = None

    def load_model(self):
        """
        Loads the model using the Model class.
        """
        self.model = Model()

    def predict(self, data):
        """
        Predicts the transcription of the provided audio data.

        Args:
            data (str): Path to the audio file to be transcribed.

        Returns:
            str: The transcribed text.
        """
        return self.model.predict(data)

    def predict_parallel(self, data):
        return self.model.predict_parallel(data)