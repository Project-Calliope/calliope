import pytest

from service.model_manager import ModelManager


class MockModel:
    """Mock d'un modèle avec une méthode predict."""
    def predict(self, input_data):
        return [0.9]

@pytest.fixture
def model_manager():
    """Fixture pour initialiser une instance de ModelManager."""
    return ModelManager()

@pytest.fixture
def mock_model():
    """Fixture pour créer un modèle simulé."""
    return MockModel()

def test_constructor(model_manager):
    """Teste que ModelManager est correctement initialisé."""
    assert hasattr(model_manager, "model"), "L'attribut 'model' doit exister"
    assert model_manager.model is None, "L'attribut 'model' doit être initialisé à None"

def test_load_model(model_manager, mock_model):
    """Teste que le modèle est bien chargé."""
    model_manager.load_model(mock_model)
    assert model_manager.model is mock_model, "Le modèle doit être correctement assigné"

def test_has_predict_method(model_manager):
    """Teste que la méthode predict existe."""
    assert hasattr(model_manager, "predict"), "La méthode 'predict' doit exister"
    assert callable(model_manager.predict), "'predict' doit être une méthode"

def test_predict_functionality(model_manager, mock_model):
    """Teste que predict fonctionne bien après le chargement du modèle."""
    model_manager.load_model(mock_model)

    sample_input = [1, 2, 3]  # Exemple d'entrée
    output = model_manager.predict(sample_input)

    assert output == [0.9], "La sortie de predict doit correspondre à celle du mock"
