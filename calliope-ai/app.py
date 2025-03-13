from flask import Flask
from api.routes import transcribe_audio

app = Flask(__name__)

app.register_blueprint(transcribe_audio, url_prefix="/api")

@app.route("/")
def home():
    """Home route for basic check."""
    return {"message": "Hello from Flask API"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
