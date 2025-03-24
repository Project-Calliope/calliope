from service.audio_processing.segmentation_strategy import SegmentationStrategy


class SilenceBasedSegmentation(SegmentationStrategy):
    """Classe pour la segmentation basée sur les silences :
    - Implémente la stratégie de segmentation basée sur les moments de silence"
    """

    def segment(self, audio_file):
        # la segmentation basée sur le silence
        pass
