from service.audio_processing.segmentation_strategy import SegmentationStrategy


class AudioProcessor:
    """Classe pour le traitement des fichiers audio"""

    def __init__(self, segmentation_strategy: SegmentationStrategy):
        self.segmentation_strategy = segmentation_strategy

    def process(self, audio_file):
        # segmentation choisie
        segments = self.segmentation_strategy.segment(audio_file)
        # suite du traitement
