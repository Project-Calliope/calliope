"""
This script loads the Whisper model of size 'small' using the OpenAI Whisper library.

Whisper is a general-purpose speech recognition model that can transcribe and translate speech.

Usage:
    The script initializes and loads the 'small' model version of Whisper.

Dependencies:
    - OpenAI Whisper library (`pip install openai-whisper`)
"""

import whisper

whisper.load_model("small")
