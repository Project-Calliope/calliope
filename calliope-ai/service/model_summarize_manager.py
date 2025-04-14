"""
This module contains classes to handle text summarization using a pretrained French T5 model.

The `Model` class is responsible for loading the summarization model and performing text summarization.
It uses the Hugging Face Transformers library to load the model and tokenizer.

The `ModelManager` class manages the `Model` instance, providing an interface for loading the model
and making predictions. The model is loaded only when needed, and it allows for summarizing text
through the `predict` method.

Usage:
    - Load the model using `ModelSummarizeManager.load_model()`.
    - Use `ModelSummarizeManager.predict(data)` to summarize a text string.

Dependencies:
    - transformers (for model , tokenizer, and pipeline)
    - torch (required for model)
    - sentencepiece (required for tokenizer)
"""

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline


class ModelSummarize:
    """
    Class to handle text summarization using a French T5 model.
    """

    def __init__(self):
        """
        Initializes the model by loading the French summarization model.
        """
        model_name = "plguillou/t5-base-fr-sum-cnndm"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        self.summarizer = pipeline(
            "summarization", model=self.model, tokenizer=self.tokenizer
        )

    def predict(self, input_text):
        """
        Summarizes the input French text.

        Args:
            input_text (str): The text to be summarized.

        Returns:
            str: The summarized text.
        """
        summary = self.summarizer(
            input_text, max_length=100, min_length=30, do_sample=False
        )
        return summary[0]["summary_text"]


class ModelSummarizeManager:
    """
    Manages the summarization model and handles the prediction process.

    This class provides an interface for loading and using the model
    for French text summarization. The model is loaded only when required,
    and predictions can be made through the `predict` method.
    """

    def __init__(self):
        """
        Initializes the ModelManager instance without a model initially.
        """
        self.model = None

    def load_model(self):
        """
        Loads the summarization model using the Model class.
        """
        self.model = ModelSummarize()

    def predict(self, data):
        """
        Predicts the summary of the provided text.

        Args:
            data (str): Input text to summarize.

        Returns:
            str: The summarized text.
        """
        return self.model.predict(data)
