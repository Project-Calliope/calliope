from abc import ABC, abstractmethod


class SegmentationStrategy(ABC):
    """Classe abstraite pour la segmentation des fichiers audio (DP Strategy)"""

    @abstractmethod
    def segment(self, audio_file):
        pass
