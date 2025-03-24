from service.audio_processing.segmentation_strategy import SegmentationStrategy
from service.data_manager import DataManager
from pydub import AudioSegment


class AudioProcessor:
    """
    Class to process audio data using a segmentation strategy.
    """

    def __init__(
        self, data_manager: DataManager, segmentation_strategy: SegmentationStrategy
    ):
        """
        Initializes the AudioProcessor with a DataManager and a segmentation strategy.
        """
        self.data_manager = data_manager
        self.segmentation_strategy = segmentation_strategy

    def preprocess_audio(self):
        """
        Preprocess the audio using the selected segmentation strategy.
        """
        segments = self.segmentation_strategy.segment(self.data_manager.audio)
        self.data_manager.segmented_audio = segments
