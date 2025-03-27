import whisper
import os


class Model:
    """
    Class to handle transcription using the Whisper model.
    """

    def __init__(self):
        """
        Initializes the model by loading the 'small' version of the Whisper model.
        """
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


class ModelManager:
    """
    Manages the model and handles the prediction process.
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
