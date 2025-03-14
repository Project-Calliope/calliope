from flask import Blueprint, request, jsonify
from service.api_handler import APIHandler

transcribe_audio = Blueprint('transcribe_audio', __name__)

@transcribe_audio.route("/transcribe", methods=["POST"])
def transcribe_audio_route():
    """Route to accept audio file for transcription."""
    
    if 'file' not in request.files:
        return jsonify({"error": "Audio file is required"}), 400

    audio_file = request.files['file']

    handler = APIHandler()
    res, transcript = handler.transcribe(audio_file)

    if not res:
        return jsonify({"error": transcript}), 400

    return jsonify({"transcript": transcript}), 200
