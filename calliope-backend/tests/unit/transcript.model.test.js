const { Transcript } = require("../../models/transcript.model");
const pool = require("../../config/pg.config");

jest.mock("../../config/pg.config", () => ({
  query: jest.fn(),
}));

describe("Transcript model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("get_transcript", () => {
    const public_user_id = "user-123";
    const public_ressource_id = "res-456";

    it("should return transcript result if found", async () => {
      const fakeResult = { transcript: "some data" };
      pool.query.mockResolvedValue({ rows: [fakeResult] });

      const result = await Transcript.get_transcript(
        public_user_id,
        public_ressource_id,
      );

      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM get_transcript($1 ,$2)`,
        [public_user_id, public_ressource_id],
      );
      expect(result).toEqual({
        success: true,
        result: fakeResult,
      });
    });

    it("should return success true with no result if transcript not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await Transcript.get_transcript(
        public_user_id,
        public_ressource_id,
      );

      expect(result).toEqual({ success: true });
    });

    it("should handle database errors", async () => {
      pool.query.mockRejectedValue(new Error("DB failure"));

      const result = await Transcript.get_transcript(
        public_user_id,
        public_ressource_id,
      );

      expect(result.success).toBe(false);
      expect(result.message).toBe("Error getting note transcript");
      expect(result.error).toBe("DB failure");
    });
  });
});
