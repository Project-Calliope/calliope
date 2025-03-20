import pytest

from service.model_manager import ModelManager

@pytest.fixture
def model_manager():
    return ModelManager()

def test_constructor(model_manager):
    assert hasattr(model_manager, "model")
    assert model_manager.model is None

def test_has_predict_method(model_manager):
    assert hasattr(model_manager, "predict")
    assert callable(model_manager.predict)