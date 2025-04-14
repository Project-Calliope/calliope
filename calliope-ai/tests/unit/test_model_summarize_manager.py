import pytest
from service.model_summarize_manager import ModelSummarizeManager


@pytest.fixture
def model_summarize_manager():
    """Fixture to initialize a ModelSummarizeManager instance.

    Returns:
        ModelSummarizeManager: A new instance of the ModelSummarizeManager class.
    """
    return ModelSummarizeManager()


@pytest.fixture
def mock_text_file():
    """
    Fixture to create a mock text file.
    """
    mock_text_file = """La biodiversité, ou diversité biologique, désigne la variété des formes de vie sur Terre, incluant les différentes espèces animales, végétales, les micro-organismes, les gènes qu'ils contiennent, et les écosystèmes qu'ils forment. Cette diversité est essentielle au fonctionnement des écosystèmes et au bien-être humain.
                        Les écosystèmes riches en biodiversité sont plus résilients et capables de s'adapter aux changements environnementaux, tels que les variations climatiques ou les catastrophes naturelles. Par exemple, une forêt tropicale avec une grande diversité d'arbres et de plantes peut mieux résister aux maladies et aux infestations d'insectes qu'une plantation monoculturelle.
                        De plus, la biodiversité contribue à de nombreux services écosystémiques dont dépendent les sociétés humaines. Parmi ces services figurent la pollinisation des cultures par les insectes, la purification de l'eau par les zones humides, la fertilité des sols grâce aux micro-organismes, et la régulation du climat par les forêts.
                        Cependant, la biodiversité est actuellement menacée par diverses activités humaines, notamment la déforestation, la pollution, le changement climatique et la surexploitation des ressources naturelles. La disparition rapide des espèces et la dégradation des habitats naturels compromettent non seulement l'équilibre des écosystèmes, mais aussi les ressources et services dont dépend l'humanité.
                        Il est donc crucial de mettre en place des mesures de conservation et de gestion durable de la biodiversité. Cela inclut la création de zones protégées, la restauration des habitats dégradés, la promotion de pratiques agricoles durables, et la sensibilisation du public à l'importance de la biodiversité. La coopération internationale est également essentielle pour relever ce défi global et assurer un avenir durable aux générations futures."""

    return mock_text_file


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


# def test_summarize(model_summarize_manager, mock_text_file):
#    """Test the summarize method of the ModelSummarizeManager class.
#
#    Args:
#        model_summarize_manager (ModelSummarizeManager): The ModelSummarizeManager instance to test.
#
#    Asserts:
#        The test asserts that the 'summarize' method exists and is callable.
#    """
#    model_summarize_manager.load_model()
#    # Test the summarize method with a mock text file
#    summary = model_summarize_manager.predict(mock_text_file)
#    assert isinstance(summary, str)
#    assert len(summary) > 0
