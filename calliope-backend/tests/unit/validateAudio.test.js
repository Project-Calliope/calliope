const validateAudio = require("../../middleware/validateAudio.middleware"); // Import du middleware

describe("Middleware validateAudio", () => {
  //  Mocks pour req, res et next
  const mockRequest = (file) => ({ file }); // Simule req.file
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); // Simule res.status()
    res.json = jest.fn().mockReturnValue(res); // Simule res.json()
    return res;
  };
  const mockNext = jest.fn(); // Simule next()

  it("Passe si le fichier est valide", () => {
    const req = mockRequest({ mimetype: "audio/mpeg", size: 5000000 });
    const res = mockResponse();

    validateAudio(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled(); // next() doit être appelé
  });

  it("Rejette un fichier non audio", () => {
    const req = mockRequest({ mimetype: "image/png", size: 5000000 });
    const res = mockResponse();

    validateAudio(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400); // Code 400
    expect(res.json).toHaveBeenCalledWith({
      message: "Le fichier doit être un fichier audio (MP3, WAV, M4A, MPEG).",
    });
  });

  it("Rejette un fichier trop volumineux", () => {
    const req = mockRequest({ mimetype: "audio/mpeg", size: 11 * 1024 * 1024 });
    const res = mockResponse();

    validateAudio(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Le fichier est trop volumineux. La taille maximale est de 10 Mo.",
    });
  });

  it("Rejette si aucun fichier n'est envoyé", () => {
    const req = mockRequest(null);
    const res = mockResponse();

    validateAudio(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Aucun fichier reçu" });
  });
});
