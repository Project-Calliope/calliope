from service.api_handler import APIHandler


def test_api_handler_creation():
    """
    Test the creation of an APIHandler instance.

    This test verifies that an APIHandler object is properly instantiated
    and that it is not None. It also checks that the object is of the correct
    type (APIHandler).
    """
    handler = APIHandler()

    assert handler is not None
    assert isinstance(handler, APIHandler)


def test_api_handler_attributes():
    """
    Test the presence of attributes in the APIHandler instance.

    This test ensures that the APIHandler object has the necessary
    attributes (data_manager and model_manager), which are critical
    for its functionality.
    """
    handler = APIHandler()

    assert hasattr(handler, "data_manager")
    assert hasattr(handler, "model_manager")
