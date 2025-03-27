from pydub import AudioSegment

"""
This modulecontains the function to preprocess the audio file before transcription.
"""


class PreprocessAudio:
    def __init__(self):
        pass

    def segmentation(self, audio_file, duration):
        """
        Segments the audio file into smaller parts.

        Parameters:
            audio_file (str): The file
            duration (int): The duration of each segment in seconds.

        Returns:
            list: A list of the segmented
        """
        pass

    def denoising(self, audio_file, denoising_method):
        """
        Removes noise from the audio file.

        Parameters:
            audio_file (str): The audio file to be denoised.
            denoising_method (str): The denoising method to be used.

        Returns:
            str: The denoised audio file.
        """
        # Possibilité de créer une autre classe pour les méthodes de débruitage
        pass

    def remove_silence(self, audio_file, sensitivity):
        """
        Removes silence from the audio file.

        Parameters:
            audio_file (str): The audio file to be processed.
            sensitivity (int): The sensitivity of the silence detection.

        Returns:
            str: The audio file without silence.
        """
        pass

    def resampling(self, audio_file, frequency):
        """
        Function that resamples the audio to the desired frequency.

        Parameters:
            audio_file (str): The audio file to be resampled.
            frequency (int): The desired frequency.

        Returns:
            str: The resampled audio file.
        """
        pass
