from service.model_transcribe_manager import Model


def test_is_singleton():
    model1 = Model()
    model2 = Model()
    assert model1 is model2
