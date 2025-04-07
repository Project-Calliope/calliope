import pytest
from service.model_summarize_manager import ModelSummarizeManager


@pytest.fixture
def model_summarize_manager():
    """Fixture to initialize a ModelSummarizeManager instance.

    Returns:
        ModelSummarizeManager: A new instance of the ModelSummarizeManager class.
    """
    return ModelSummarizeManager()


def test_constructor(model_summarize_manager):
    """Test the constructor of the ModelSummarizeManager class.

    Args:
        modelsummarize_manager (ModelSummarizeManager): The ModelSummarizeManager instance to test.

    Asserts:
        The test asserts that the 'model' attribute exists and is initially set to None.
    """
    assert hasattr(model_summarize_manager, "model")
    assert model_summarize_manager.model is None


def test_has_predict_method(model_summarize_manager):
    """Test if the ModelSummarizeManager class has a 'predict' method.

    Args:
        model_summarize_manager (ModelSummarizeManager): The ModelSummarizeManager instance to test.

    Asserts:
        The test asserts that the 'predict' method exists and is callable.
    """
    assert hasattr(model_summarize_manager, "predict")
    assert callable(model_summarize_manager.predict)
