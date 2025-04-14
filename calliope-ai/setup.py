"""
This script loads the Whisper model of size 'small' using the OpenAI Whisper library.

Whisper is a general-purpose speech recognition model that can transcribe and translate speech.

Usage:
    The script initializes and loads the 'small' model version of Whisper.

Dependencies:
    - OpenAI Whisper library (`pip install openai-whisper`)
"""

import whisper
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

whisper.load_model("small")

model_name = "plguillou/t5-base-fr-sum-cnndm"
tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)
