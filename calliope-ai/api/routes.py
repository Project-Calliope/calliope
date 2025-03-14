from flask import Blueprint, request, jsonify
from service.api_handler import APIHandler

transcribe_audio = Blueprint("transcribe_audio", __name__)


@transcribe_audio.route("/transcribe", methods=["POST"])
def transcribe_audio_route():
    """Route for transcription."""

    if "file" not in request.files:
        return jsonify({"error": "Audio file is required"}), 400

    audio_file = request.files["file"]

    handler = APIHandler()
    success, message = handler.transcribe(audio_file)

    if not success:
        return jsonify({"error": message}), 415

    return jsonify({"transcript": message}), 200
