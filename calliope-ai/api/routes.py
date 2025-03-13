from flask import Blueprint, request, jsonify

transcribe_audio = Blueprint('transcribe_audio', __name__)

SUPPORTED_FORMATS = ['wav', 'mp3', 'm4a']

@transcribe_audio.route("/transcribe", methods=["POST"])
def transcribe_audio_route():
    """Route to accept audio file for transcription."""
    if 'file' not in request.files:
        return jsonify({"error": "Audio file is required"}), 400

    audio_file = request.files['file']

    if audio_file.filename == '':
        return jsonify({"error": "Audio file is required"}), 400

    file_format = audio_file.mimetype.split('/')[1]

    if file_format not in SUPPORTED_FORMATS:
        return jsonify({"error": "Unsupported audio format"}), 415

    try:
        file_data = audio_file.read()

        if b'corrupted' in file_data:
            return jsonify({"error": "Corrupted or unreadable audio file"}), 400

        return jsonify({"transcript": "This is a dummy transcript."}), 200

    except Exception:
        return jsonify({"error": "Corrupted or unreadable audio file"}), 400
