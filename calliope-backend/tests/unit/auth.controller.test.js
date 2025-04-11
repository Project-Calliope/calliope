const { signup, signin, whoami } = require("../../controllers/auth.controller");
const { User } = require("../../models/user.model");
const jwt = require("jsonwebtoken");

jest.mock("../../models/user.model");
jest.mock("jsonwebtoken");

jest.mock("../../config/jwt.config", () => ({
  secret: "test_secret",
  expiresIn: "1h",
}));

describe("auth.controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      user: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("devrait créer un utilisateur et retourner un token", async () => {
      req.body = {
        username: "testuser",
        email: "test@example.com",
        password: "testpass",
      };

      const fakeUser = { public_user_id: "user123" };
      User.save.mockResolvedValue({ success: true, user: fakeUser });
      jwt.sign.mockReturnValue("signed_token");

      await signup(req, res);

      expect(User.save).toHaveBeenCalledWith(
        "testuser",
        "test@example.com",
        "testpass",
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { public_user_id: "user123" },
        "test_secret",
        { expiresIn: "1h" },
      );

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: fakeUser,
        token: "Bearer signed_token",
      });
    });

    it("devrait retourner une erreur si la création échoue", async () => {
      User.save.mockResolvedValue({
        success: false,
        message: "email déjà utilisé",
      });

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "email déjà utilisé",
      });
    });
  });

  describe("signin", () => {
    it("devrait connecter un utilisateur et retourner un token", async () => {
      req.body = {
        email: "test@example.com",
        password: "testpass",
      };

      const fakeUser = { public_user_id: "user456" };
      User.login.mockResolvedValue({ success: true, user: fakeUser });
      jwt.sign.mockReturnValue("another_token");

      await signin(req, res);

      expect(User.login).toHaveBeenCalledWith("test@example.com", "testpass");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: fakeUser,
        token: "Bearer another_token",
      });
    });

    it("devrait retourner une erreur si les identifiants sont invalides", async () => {
      User.login.mockResolvedValue({
        success: false,
        message: "invalid credentials",
      });

      await signin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "invalid credentials",
      });
    });
  });

  describe("whoami", () => {
    it("devrait retourner les infos de l'utilisateur connecté", async () => {
      req.user = { public_user_id: "user789" };
      User.whoami.mockResolvedValue({ success: true, user: { name: "Alice" } });

      await whoami(req, res);

      expect(User.whoami).toHaveBeenCalledWith("user789");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: { name: "Alice" },
      });
    });

    it("devrait retourner une erreur si l'utilisateur n'est pas trouvé", async () => {
      req.user = { public_user_id: "user789" };
      User.whoami.mockResolvedValue({ success: false });

      await whoami(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "You are not logged in",
      });
    });
  });
});
