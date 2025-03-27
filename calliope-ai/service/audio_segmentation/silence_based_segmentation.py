from service.audio_segmentation.segmentation_strategy import SegmentationStrategy
from pydub import AudioSegment


class SilenceBasedSegmentation(SegmentationStrategy):
    """
    Class for segmenting audio based on silence.

    This class implements a segmentation strategy that divides the audio into segments
    based on periods of silence. It identifies non-silent sections and splits the audio
    accordingly.

    Methods:
        segment(audio_file): Segments the provided audio file based on silences.
    """

    def segment(self, audio_file) -> list:
        """
        Segments the audio file based on silences.

        This method identifies non-silent sections in the audio and creates segments
        based on the periods of silence.

        Args:
            audio_file (str): The path to the audio file to be segmented.

        Returns:
            list: A list of AudioSegment objects representing the non-silent segments.
        """
        audio_segment = AudioSegment.from_file(audio_file)
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
