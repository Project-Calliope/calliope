import pytest
from service.model_transcribe_manager import ModelTranscribeManager


@pytest.fixture
def model_manager():
    """Fixture to initialize a ModelTranscribeManager instance.

    Returns:
        ModelTranscribeManager: A new instance of the ModelTranscribeManager class.
    """
    return ModelTranscribeManager()


def test_constructor(model_manager):
    """Test the constructor of the ModelTranscribeManager class.

    Args:
        model_manager (ModelTranscribeManager): The ModelTranscribeManager instance to test.

    Asserts:
        The test asserts that the 'model' attribute exists and is initially set to None.
    """
    assert hasattr(model_manager, "model")
    assert model_manager.model is None


def test_has_predict_method(model_manager):
    """Test if the ModelTranscribeManager class has a 'predict' method.

    Args:
        model_manager (ModelTranscribeManager): The ModelTranscribeManager instance to test.

    Asserts:
        The test asserts that the 'predict' method exists and is callable.
    """
    assert hasattr(model_manager, "predict_transcription")
    assert callable(model_manager.predict_transcription)
