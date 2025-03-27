import whisper

import os


class Model:

    def __init__(self):
        self.model = whisper.load_model("small")

    def predict(self, input_data):

        tr = self.model.transcribe(input_data)["text"]
        os.unlink(input_data)
        return tr


class ModelManager:

    def __init__(self):
        self.model = None

    def load_model(self):
        self.model = Model()

    def predict(self, data):

        return self.model.predict(data)
