"""ToDo : To refactor !!"""

import whisper

class Model:
    
    def __init__(self):
        self.model = whisper.load_model("turbo")

    def predict(self, input_data):
        return self.model.transcribe(input_data)


class ModelManager:

    def __init__(self):
        self.model = None

    def load_model(self, model):
        if model = "turbo":
            self.model = Model()
        self.model = model
    
    def predict(self, input_data):
        return self.model.predict(input_data)