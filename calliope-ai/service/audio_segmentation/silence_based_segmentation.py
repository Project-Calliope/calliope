from service.audio_segmentation.segmentation_strategy import SegmentationStrategy
from fastapi import UploadFile
from pydub import AudioSegment


class SilenceBasedSegmentation(SegmentationStrategy):
    """Classe pour la segmentation basée sur les silences :
    - Implémente la stratégie de segmentation basée sur les moments de silence"
    """

    def segment(self, audio_file: UploadFile) -> list:
        """Segmentation du fichier audio en fonction des silences"""
        audio_segment = AudioSegment.from_file(audio_file.file)
        print("audio.type", type(audio_segment))
        silence_thresh = -40
        min_silence_len = 500
        silence_threshold = audio_segment.dBFS - silence_thresh
        non_silent_sections = []
        current_start = 0

        for i in range(0, len(audio_segment), min_silence_len):
            segment = audio_segment[i : i + min_silence_len]

            if segment.dBFS >= silence_threshold:
                if i + min_silence_len >= len(audio_segment):
                    non_silent_sections.append(audio_segment[current_start:])

                elif audio_segment[i + min_silence_len].dBFS < silence_threshold:
                    non_silent_sections.append(
                        audio_segment[current_start : i + min_silence_len]
                    )
                    current_start = i + min_silence_len
            else:
                if i > current_start:
                    non_silent_sections.append(audio_segment[current_start:i])
                    current_start = i + min_silence_len

        return non_silent_sections
