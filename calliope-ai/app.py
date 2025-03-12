"""
app.py
This module contains the Flask application for the Calliope AI project.
It defines a simple route that returns a welcome message.

Routes:
    / (home): Returns a welcome message.
"""

from flask import Flask


app = Flask(__name__)


@app.route("/")
def home():
    """
    A simple Flask route that returns a welcome message.
    Returns:
        dict: A dictionary containing a welcome message.
    """
    return {"message": "Hello from Flask API"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
