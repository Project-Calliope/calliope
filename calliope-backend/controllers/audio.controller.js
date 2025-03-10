// controllers/audio.controller.js

exports.uploadAudio = (req, res) => {
    // Upload audio file to server
    // ...
    // Return response
    res.status(200).json({
        message: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding
    })
}



