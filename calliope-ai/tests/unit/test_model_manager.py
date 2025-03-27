import pytest
from service.model_manager import ModelManager


@pytest.fixture
def model_manager():
    """Fixture to initialize a ModelManager instance.

    Returns:
        ModelManager: A new instance of the ModelManager class.
    """
    return ModelManager()


def test_constructor(model_manager):
    """Test the constructor of the ModelManager class.

    Args:
        model_manager (ModelManager): The ModelManager instance to test.

    Asserts:
        The test asserts that the 'model' attribute exists and is initially set to None.
    """
    assert hasattr(model_manager, "model")
    assert model_manager.model is None


def test_has_predict_method(model_manager):
    """Test if the ModelManager class has a 'predict' method.

    Args:
        model_manager (ModelManager): The ModelManager instance to test.

    Asserts:
        The test asserts that the 'predict' method exists and is callable.
    """
    assert hasattr(model_manager, "predict")
    assert callable(model_manager.predict)
