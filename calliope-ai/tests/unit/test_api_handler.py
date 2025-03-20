import pytest

from service.api_handler import APIHandler


def test_api_handler_creation():
    handler = APIHandler()

    assert handler is not None
    assert isinstance(handler, APIHandler)


def test_api_handler_attributes():
    handler = APIHandler()

    assert hasattr(handler, "data_manager")
    assert hasattr(handler, "model_manager")
