"""
Unit tests for the transcription route of the FastAPI application.

These tests validate the `/api/transcribe` endpoint by simulating requests with various
audio files, verifying the transcription process, and ensuring that errors are handled
properly.

The tests cover scenarios with valid and invalid audio formats, missing files, and
real-world audio files for transcription validation.
"""

import os

from io import BytesIO

import pytest

from fastapi import UploadFile
from fastapi.testclient import TestClient
from pydub import AudioSegment

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
    Fixture to create a mock text file.
    """
    mock_text_file = """La biodiversité, ou diversité biologique, désigne la variété des formes de vie sur Terre, incluant les différentes espèces animales, végétales, les micro-organismes, les gènes qu'ils contiennent, et les écosystèmes qu'ils forment. Cette diversité est essentielle au fonctionnement des écosystèmes et au bien-être humain.
                        Les écosystèmes riches en biodiversité sont plus résilients et capables de s'adapter aux changements environnementaux, tels que les variations climatiques ou les catastrophes naturelles. Par exemple, une forêt tropicale avec une grande diversité d'arbres et de plantes peut mieux résister aux maladies et aux infestations d'insectes qu'une plantation monoculturelle.
                        De plus, la biodiversité contribue à de nombreux services écosystémiques dont dépendent les sociétés humaines. Parmi ces services figurent la pollinisation des cultures par les insectes, la purification de l'eau par les zones humides, la fertilité des sols grâce aux micro-organismes, et la régulation du climat par les forêts.
                        Cependant, la biodiversité est actuellement menacée par diverses activités humaines, notamment la déforestation, la pollution, le changement climatique et la surexploitation des ressources naturelles. La disparition rapide des espèces et la dégradation des habitats naturels compromettent non seulement l'équilibre des écosystèmes, mais aussi les ressources et services dont dépend l'humanité.
                        Il est donc crucial de mettre en place des mesures de conservation et de gestion durable de la biodiversité. Cela inclut la création de zones protégées, la restauration des habitats dégradés, la promotion de pratiques agricoles durables, et la sensibilisation du public à l'importance de la biodiversité. La coopération internationale est également essentielle pour relever ce défi global et assurer un avenir durable aux générations futures."""

    return mock_text_file

    # def test_summarize(client, mock_text_file):
    """
    Test the summarize route with a mock text file.
    This test verifies that the summarize route correctly processes a text file and returns a summary.
    """
    expected_summary = "La biodiversité contribue à de nombreux services écosystémiques qui dépendent des sociétés humaines. Parmi ces services, mentionnons la pollinisation des cultures par les insectes, la purification de l'eau par les zones humides et la fertilité des sols grâce aux micro-organismes. Il est donc crucial de mettre en ?? uvre des mesures de conservation e"

    response = client.post("/api/summarize", mock_text_file)

    assert response.status_code == 200

    json_data = response.json()
    assert "summary" in json_data
    assert isinstance(json_data["summary"], str)

    assert (
        json_data["summary"] == expected_summary
    ), f"Résumé incorrect : {json_data['summary']}"
