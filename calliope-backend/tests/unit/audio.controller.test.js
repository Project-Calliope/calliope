const { uploadAudio } = require("../../controllers/audio.controller");
const { Ressource } = require("../../models/ressource.model");

jest.mock("../../models/ressource.model");

describe("uploadAudio", () => {
  let req, res;

  beforeEach(() => {
    req = {
      file: null,
      body: {},
      user: { public_user_id: "user123" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("devrait retourner une erreur si aucun fichier n'est fourni", async () => {
    await uploadAudio(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "No file uploaded" });
  });

  it("devrait retourner une erreur si la transcription a échoué (transcrible présent)", async () => {
    req.file = { transcrible: true }; // simulate transcription failed
    await uploadAudio(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Le transcription du fichier audio n'a pas abouti",
    });
  });

  it("devrait retourner une erreur si ressource_father_id est manquant", async () => {
    req.file = { transcrible: false };
    await uploadAudio(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No father ressource id provided",
    });
  });

  it("devrait créer une note avec succès", async () => {
    req.file = {
      transcrible: false,
      originalname: "audio.mp3",
      transcript: "Transcription du fichier",
      size: 1024,
    };
    req.body.ressource_father_id = "parent456";

    Ressource.create_note_with_transcript.mockResolvedValue({
      success: true,
      data: { id: "note789" },
    });

    await uploadAudio(req, res);

    expect(Ressource.create_note_with_transcript).toHaveBeenCalledWith(
      "user123",
      "parent456",
      "audio.mp3",
      "Transcription du fichier",
      "audio.mp3",
      1024,
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { id: "note789" },
    });
  });

  it("devrait retourner une erreur si la création échoue", async () => {
    req.file = {
      transcrible: false,
      originalname: "audio.mp3",
      transcript: "Transcription du fichier",
      size: 1024,
    };
    req.body.ressource_father_id = "parent456";

    Ressource.create_note_with_transcript.mockResolvedValue({
      success: false,
    });

    await uploadAudio(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "L'enregistrement a échoué",
    });
  });
});
