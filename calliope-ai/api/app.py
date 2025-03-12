from flask import Flask, request, jsonify

app = Flask(__name__)

SUPPORTED_FORMATS = ['wav', 'mp3', 'm4a']


@app.route("/api/transcribe", methods=["POST"])
def transcribe_audio():
    """Route to accept audio file for transcription."""
    # TODO: Check if 'file' is part of the request
    if 'file' not in request.files:
        return jsonify({"error": "Audio file is required"}), 400

    audio_file = request.files['file']

    print(audio_file)

    # TODO: Check if the filename is empty
    if audio_file.filename == '':
        return jsonify({"error": "Audio file is required"}), 400

    file_format = audio_file.mimetype.split('/')[1]

    print(file_format)

    # TODO: Check if the file format is supported
    if file_format not in SUPPORTED_FORMATS:
        return jsonify({"error": "Unsupported audio format"}), 415

    try:
        file_data = audio_file.read()

        # TODO: Check if file is corrupted
        # For now, checking if file data contains 'corrupted'
        if b'corrupted' in file_data:
            return jsonify({"error": "Corrupted or unreadable audio file"}), 400

        # TODO: Call APIHandler to handle transcription
        # For now, returning a dummy transcript
        return jsonify({"transcript": "This is a dummy transcript."}), 200

    except Exception:
        return jsonify({"error": "Corrupted or unreadable audio file"}), 400


@app.route("/")
def home():
    """Home route for basic check."""
    return {"message": "Hello from Flask API"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
