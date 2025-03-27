from pydub import AudioSegment

"""
This module contains the function to preprocess the audio file before transcription.
"""


class PreprocessAudio:
    """
    A class that handles preprocessing of audio files before transcription.

    This class provides methods to segment the audio, denoise it, remove silence,
    and resample it to a specific frequency.
    """

    def __init__(self):
        """
        Initializes the PreprocessAudio instance.
        """
        pass

    def segmentation(self, audio_file, duration):
        """
        Segments the audio file into smaller parts based on the given duration.

        Parameters:
            audio_file (str): The path to the audio file to be processed.
            duration (int): The duration of each segment in milliseconds.

        Returns:
            list: A list of audio segments as AudioSegment objects.
        """
        pass

    def denoising(self, audio_file, denoising_method):
        """
        Removes noise from the audio file using the specified denoising method.

        Parameters:
            audio_file (str): The path to the audio file to be denoised.
            denoising_method (str): The denoising method to be used.
                                    (Could be 'spectral_gate', 'noise_gate', etc.)

        Returns:
            AudioSegment: The denoised audio as an AudioSegment object.
        """
        pass

    def remove_silence(self, audio_file, sensitivity):
        """
        Removes silence from the audio file using a given sensitivity.

        Parameters:
            audio_file (str): The path to the audio file.
            sensitivity (int): The sensitivity level for silence detection.
                                A lower value will detect shorter silences.

        Returns:
            AudioSegment: The audio file with silence removed.
        """
        pass

    def resampling(self, audio_file, frequency):
        """
        Resamples the audio file to a desired frequency.

        Parameters:
            audio_file (str): The path to the audio file to be resampled.
            frequency (int): The desired frequency (e.g., 16000 for 16 kHz).

        Returns:
            AudioSegment: The resampled audio file.
        """
        pass
