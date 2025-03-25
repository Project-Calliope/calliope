from service.audio_segmentation.segmentation_strategy import SegmentationStrategy
from pydub import AudioSegment


class AudioProcessor:
    """
    Class to process audio data using a segmentation strategy.
    """

    def __init__(self, audio, segmentation_strategy: SegmentationStrategy):
        """
        Initializes the AudioProcessor with a DataManager and a segmentation strategy.
        """
        from service.data_manager import DataManager

        self.audio = audio
        self.segmentation_strategy = segmentation_strategy

    def preprocess_audio(self):
        """
        Preprocess the audio using the selected segmentation strategy.
        """
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        print("All good here")
        segments = self.segmentation_strategy.segment(self.audio)
        print("Not here")
        return segments
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
