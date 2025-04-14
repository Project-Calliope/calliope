const calliopeAiAPI = require("../config/ai.config");
const FormData = require("form-data");

/**
 * Middleware for transcribing uploaded files via Calliope AI API.
 *
 * Attaches the transcript to `req.file.transcript`. Responds with 400 if no file
 * is uploaded, or 500 if an error occurs during transcription.
 *
 * @async
 * @function transcribe
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function.
 */
const transcribe = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await calliopeAiAPI.post("/api/transcribe", formData, {
      headers: {
        ...formData.getHeaders(),
        timeout: 300000, // 5 minutes
      },
    });
    console.log(response.data);
    req.file.transcript = response.data.transcript;
    next();
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

module.exports = {
  transcribe,
};
