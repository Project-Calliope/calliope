import pytest

from service.api_handler import APIHandler


def test_api_handler_creation():
    handler = APIHandler()

    assert handler is not None, "L'APIHandler ne s'est pas bien créé"
    assert isinstance(
        handler, APIHandler
    ), "L'objet créé n'est pas une instance de APIHandler"


def test_api_handler_attributes():
    handler = APIHandler()

    assert hasattr(
        handler, "data_manager"
    ), "L'APIHandler ne possède pas l'attribut 'data_manager'"
    # assert hasattr(handler, 'model'), "L'APIHandler ne possède pas l'attribut 'model'"
