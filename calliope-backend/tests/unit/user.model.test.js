const { User } = require("../../models/user.model");
const pool = require("../../config/pg.config");

jest.mock("../../config/pg.config", () => ({
  query: jest.fn(),
}));

describe("User model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  user.model.test;
  describe("get", () => {
    it("should return user if email exists", async () => {
      const fakeUser = { public_user_id: "abc123", email: "test@example.com" };
      pool.query.mockResolvedValue({ rows: [fakeUser] });

      const result = await User.get("test@example.com");

      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM get_user_public_id($1)`,
        ["test@example.com"],
      );
      expect(result).toEqual({ success: true, user: fakeUser });
    });

    it("should return error if user does not exist", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await User.get("unknown@example.com");

      expect(result).toEqual({
        success: false,
        message: "User does not exist",
      });
    });

    it("should handle errors", async () => {
      pool.query.mockRejectedValue(new Error("Connection error"));

      const result = await User.get("test@example.com");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Error getting user information");
    });
  });

  describe("login", () => {
    it("should return user on successful login", async () => {
      const fakeUser = { public_user_id: "abc123" };
      pool.query.mockResolvedValue({ rows: [fakeUser] });

      const result = await User.login("test@example.com", "password");

      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM login_user($1, $2)`,
        ["test@example.com", "password"],
      );
      expect(result).toEqual({ success: true, user: fakeUser });
    });

    it("should return error if user does not exist", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await User.login("test@example.com", "wrongpass");

      expect(result.success).toBe(false);
      expect(result.message).toBe("User does not exist");
    });

    it("should handle errors", async () => {
      pool.query.mockRejectedValue(new Error("DB error"));

      const result = await User.login("email", "pass");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Error getting user information");
    });
  });

  describe("save", () => {
    it("should return created user", async () => {
      const fakeUser = { public_user_id: "xyz456" };
      pool.query.mockResolvedValue({ rows: [fakeUser] });

      const result = await User.save("username", "test@example.com", "pass");

      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM create_user($1, $2, $3)`,
        ["username", "test@example.com", "pass"],
      );
      expect(result).toEqual({ success: true, user: fakeUser });
    });

    it("should handle errors", async () => {
      pool.query.mockRejectedValue(new Error("Insert error"));

      const result = await User.save("username", "email", "pass");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Error creating user");
    });
  });

  describe("whoami", () => {
    it("should return user by public_user_id", async () => {
      const fakeUser = { public_user_id: "abc123", email: "test@example.com" };
      pool.query.mockResolvedValue({ rows: [fakeUser] });

      const result = await User.whoami("abc123");

      expect(pool.query).toHaveBeenCalledWith(`SELECT * FROM get_user($1)`, [
        "abc123",
      ]);
      expect(result).toEqual({ success: true, user: fakeUser });
    });

    it("should return error if user not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await User.whoami("unknown");

      expect(result).toEqual({
        success: false,
        message: "User does not exist",
      });
    });

    it("should handle errors", async () => {
      pool.query.mockRejectedValue(new Error("Fail"));

      const result = await User.whoami("id");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Error getting user information");
    });
  });
});
