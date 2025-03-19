class ModelManager:

    def __init__(self):
        self.model = None

    def load_model(self, model):
        self.model = model
    
    def predict(self, input_data):
        return self.model.predict(input_data)