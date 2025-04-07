from service.audio_segmentation.segmentation_strategy import SegmentationStrategy
from pydub import AudioSegment
import os


class NSplitSegmentation(SegmentationStrategy):
    def __init__(self, n_split):
        super().__init__()
        self.n_split = n_split

    def segment(self, audio_file):
        # Loading audio
        audio = AudioSegment.from_file(audio_file)

        # Infos on the path
        folder_path = os.path.dirname(audio_file)
        base_name = os.path.splitext(os.path.basename(audio_file))[0]

        # Calculating split durations
        total_duration_ms = len(audio)
        segment_duration_ms = total_duration_ms // self.n_split

        file_dict = {}
        # Cutting the audio and saving segments
        for i in range(self.n_split):
            start_time = i * segment_duration_ms
            end_time = (
                start_time + segment_duration_ms
                if i < self.n_split - 1
                else total_duration_ms
            )
            segment = audio[start_time:end_time]
            segment_path = os.path.join(folder_path, f"{base_name}_part{i+1}.wav")
            segment.export(segment_path, format="wav")
            file_dict[i] = segment_path
        os.unlink(audio_file)
        return file_dict
