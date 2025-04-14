jest.mock("../../config/pg.config", () => ({
  query: jest.fn(),
}));

const pool = require("../../config/pg.config");
const { Ressource } = require("../../models/ressource.model"); // adapte le chemin si nécessaire

describe("Ressource", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("get_root_ressource", () => {
    it("should return the root ressource if found", async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1, name: "root" }] });

      const result = await Ressource.get_root_ressource("user-1");

      expect(result.success).toBe(true);
      expect(result.result).toEqual({ id: 1, name: "root" });
    });

    it("should return a failure message if no root ressource is found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await Ressource.get_root_ressource("user-1");

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/root folder/);
    });

    it("should handle query errors", async () => {
      pool.query.mockRejectedValue(new Error("DB error"));

      const result = await Ressource.get_root_ressource("user-1");

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/Error getting user information/);
      expect(result.error).toBe("DB error");
    });
  });

  describe("get_arborescence", () => {
    it("should return arborescence result", async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1 }, { id: 2 }] });

      const result = await Ressource.get_arborescence("user-1");

      expect(result.success).toBe(true);
      expect(result.result).toHaveLength(2);
    });

    it("should handle query errors", async () => {
      pool.query.mockRejectedValue(new Error("Query fail"));

      const result = await Ressource.get_arborescence("user-1");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Query fail");
    });
  });

  describe("create_note_with_transcript", () => {
    it("should return the public ressource id when created", async () => {
      pool.query.mockResolvedValue({
        rows: [{ create_note_with_transcript: "note-id-123" }],
      });

      const result = await Ressource.create_note_with_transcript(
        "user-1",
        "folder-1",
        "Note title",
        "Note content",
        "audio.mp3",
        1024,
      );

      expect(result.success).toBe(true);
      expect(result.public_ressource_id).toBe("note-id-123");
    });

    it("should return error on failure", async () => {
      pool.query.mockRejectedValue(new Error("Create error"));

      const result = await Ressource.create_note_with_transcript(
        "user-1",
        "folder-1",
        "Note title",
        "Note content",
        "audio.mp3",
        1024,
      );

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/Issue while creating ressource/);
    });
  });

  describe("create_note", () => {
    it("should create a note and return id", async () => {
      pool.query.mockResolvedValue({ rows: [{ create_note: "note-xyz" }] });

      const result = await Ressource.create_note(
        "user-1",
        "folder-1",
        "My Note",
      );

      expect(result.success).toBe(true);
      expect(result.public_ressource_id).toBe("note-xyz");
    });
  });

  describe("get_note", () => {
    it("should return a note if found", async () => {
      pool.query.mockResolvedValue({ rows: [{ title: "My Note" }] });

      const result = await Ressource.get_note("user-1", "note-1");

      expect(result.success).toBe(true);
      expect(result.note).toEqual({ title: "My Note" });
    });

    it("should return error if not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await Ressource.get_note("user-1", "note-1");

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/n'a pas pu être chargé/);
    });
  });

  describe("create_folder", () => {
    it("should return folder id when created", async () => {
      pool.query.mockResolvedValue({ rows: ["folder-1"] });

      const result = await Ressource.create_folder(
        "user-1",
        "parent-id",
        "New Folder",
      );

      expect(result.success).toBe(true);
      expect(result.public_ressource_id).toBe("folder-1");
    });
  });

  describe("update_note", () => {
    it("should confirm update success", async () => {
      pool.query.mockResolvedValue({}); // no rows needed

      const result = await Ressource.update_note(
        "user-1",
        "note-1",
        "Updated content",
      );

      expect(result.success).toBe(true);
      expect(result.message).toMatch(/mise à jour/);
    });

    it("should handle update failure", async () => {
      pool.query.mockRejectedValue(new Error("Update fail"));

      const result = await Ressource.update_note(
        "user-1",
        "note-1",
        "Updated content",
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe("Update fail");
    });
  });
});
