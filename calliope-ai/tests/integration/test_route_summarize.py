"""
Unit tests for the transcription and summarization routes of the FastAPI application.

These tests validate the `/api/transcribe` and `/api/summarize` endpoints by simulating requests
with audio files and text input, verifying the processing, and ensuring that errors are handled properly.
"""

import io
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from app import app


@pytest.fixture
def client():
    """
    Fixture to initialize a FastAPI test client.

    This fixture creates and returns a TestClient instance that simulates HTTP requests to the
    FastAPI application. It is useful for testing routes and interacting with the app without
    starting an actual server.

    Returns:
        TestClient: A FastAPI test client instance.
    """
    return TestClient(app)


@pytest.fixture
def mock_text_file():
    """
    Fixture to provide a mock French text for summarization.
    """
    return (
        "La biodiversité, ou diversité biologique, désigne la variété des formes de vie sur Terre, "
        "incluant les différentes espèces animales, végétales, les micro-organismes, les gènes qu'ils contiennent, "
        "et les écosystèmes qu'ils forment. Cette diversité est essentielle au fonctionnement des écosystèmes "
        "et au bien-être humain."
    )


def test_summarize(client, mock_text_file):
    """
    Test the summarize route with a mock text input and a mocked summarize handler.
    """
    expected_summary = "La biodiversité désigne la variété des formes de vie sur Terre et est essentielle aux écosystèmes."

    with patch(
        "service.api_handler.APIHandler.summarize",
        return_value=(True, expected_summary),
    ):
        response = client.post("/api/summarize", json={"text": mock_text_file})

    assert response.status_code == 200
    json_data = response.json()
    assert "summary" in json_data
    assert json_data["summary"] == expected_summary


def test_summarize_empty_text(client):
    """
    Test the summarize route with empty input.
    """
    response = client.post("/api/summarize", json={"text": ""})
    assert response.status_code == 400
    assert response.json()["detail"] == "Text is required"
