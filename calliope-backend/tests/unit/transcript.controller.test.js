const { getById } = require("../../controllers/transcript.controller");
const { Transcript } = require("../../models/transcript.model");

jest.mock("../../models/transcript.model");

describe("Transcript Controller - getById", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { public_user_id: "user123" },
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("should return 400 if ressource_id is not provided", async () => {
    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "L'identifiant de la ressource est obligaoire",
    });
  });

  it("should return 200 with result if get_transcript is successful", async () => {
    req.query.ressource_id = "res123";
    const fakeResult = { success: true, transcript: "text content" };
    Transcript.get_transcript.mockResolvedValue(fakeResult);

    await getById(req, res);

    expect(Transcript.get_transcript).toHaveBeenCalledWith("res123", "user123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
  });

  it("should return 400 if get_transcript fails", async () => {
    req.query.ressource_id = "res123";
    const fakeResult = { success: false, message: "Erreur" };
    Transcript.get_transcript.mockResolvedValue(fakeResult);

    await getById(req, res);

    expect(Transcript.get_transcript).toHaveBeenCalledWith("res123", "user123");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
  });
});
