from service.audio_processing.segmentation_strategy import SegmentationStrategy
from fastapi import UploadFile
from pydub import AudioSegment


class SilenceBasedSegmentation(SegmentationStrategy):
    """Classe pour la segmentation basée sur les silences :
    - Implémente la stratégie de segmentation basée sur les moments de silence"
    """

    def segment(self, audio_file: UploadFile) -> list:
        """Segmentation du fichier audio en fonction des silences"""
        audio = AudioSegment.from_file(audio_file.file)
        # on récupère les indices des silences
        silence_ranges = audio.detect_silence(min_silence_len=1000, silence_thresh=-40)
        segments = []
        for start, end in silence_ranges:
            segments.append(audio[start:end])
        return segments
