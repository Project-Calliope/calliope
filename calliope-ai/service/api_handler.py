from service.data_manager import DataManager

class APIHandler:
    
    def __init__(self):
        self.data_manager = DataManager()
        self.model = None

    def transcribe(self, audio_file):
        """
        Transcribes the audio file into text.

        Parameters:
            audio_file (FileStorage): The audio file to be transcribed.

        Returns:
            str: The transcribed text.
        """
        self.data_manager.load_audio(audio_file)

        if not self.data_manager.validate_data():
            return "Audio file is corrupted or in an unsupported format."

        # TODO

        return "Transcription placeholder"