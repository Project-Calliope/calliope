from service.audio_segmentation.segmentation_strategy import SegmentationStrategy
from pydub import AudioSegment
from fastapi import UploadFile


class FixedDurationSegmentation(SegmentationStrategy):
    """Classe pour la segmentation basée sur une durée fixe :
    - Implémente la stratégie de segmentation basée sur une durée fixe"
    """

    def __init__(self, duration_ms=10000):
        self.duration_ms = duration_ms

    def segment(self, audio) -> list:
        print("FixedDurationSegmentation")
        print(audio)
        audio = AudioSegment.from_file(audio["filecontent"])
        segments = []
        for i in range(0, len(audio), self.duration_ms):
            segments.append(audio[i : i + self.duration_ms])
        return segments
