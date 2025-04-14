const {
  getArborescence,
  getNote,
  createFolder,
  updateNote,
  createNote,
} = require("../../controllers/ressource.controller");

const { Ressource } = require("../../models/ressource.model");
jest.mock("../../models/ressource.model");

describe("ressource.controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { public_user_id: "user123" },
      body: {},
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("getArborescence", () => {
    it("devrait retourner la racine et l'arborescence", async () => {
      Ressource.get_root_ressource.mockResolvedValue({
        success: true,
        result: "racine",
      });
      Ressource.get_arborescence.mockResolvedValue({
        success: true,
        result: ["f1", "f2"],
      });

      await getArborescence(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        root: "racine",
        arborescence: ["f1", "f2"],
      });
    });

    it("devrait retourner une erreur en cas d'échec", async () => {
      Ressource.get_root_ressource.mockResolvedValue({ success: false });
      Ressource.get_arborescence.mockResolvedValue({ success: false });

      await getArborescence(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to retrieve the arborescence or root resource.",
      });
    });
  });

  describe("getNote", () => {
    it("devrait retourner une note", async () => {
      req.query.ressource_id = "note456";
      Ressource.get_note.mockResolvedValue({
        success: true,
        note: "contenu note",
      });

      await getNote(req, res);

      expect(Ressource.get_note).toHaveBeenCalledWith("user123", "note456");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        note: "contenu note",
      });
    });

    it("devrait retourner une erreur si aucun ID n'est fourni", async () => {
      await getNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Aucun identifiant de ressource fourni",
      });
    });

    it("devrait retourner une erreur si la note n'est pas trouvée", async () => {
      req.query.ressource_id = "note999";
      Ressource.get_note.mockResolvedValue({
        success: false,
        message: "Introuvable",
      });

      await getNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Introuvable",
      });
    });
  });

  describe("createFolder", () => {
    it("devrait créer un dossier", async () => {
      req.body = {
        ressource_name: "Dossier A",
        public_father_id: "parent123",
      };
      Ressource.create_folder.mockResolvedValue({ success: true });

      await createFolder(req, res);

      expect(Ressource.create_folder).toHaveBeenCalledWith(
        "user123",
        "parent123",
        "Dossier A",
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it("devrait retourner une erreur si le nom est manquant", async () => {
      req.body.public_father_id = "parent123";

      await createFolder(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Nom de la ressource obligatoire",
      });
    });

    it("devrait retourner une erreur si le parent est manquant", async () => {
      req.body.ressource_name = "Dossier A";

      await createFolder(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Identifiant de la ressource parente obligatoire",
      });
    });
  });

  describe("updateNote", () => {
    it("devrait mettre à jour une note", async () => {
      req.body = {
        ressource_id: "note789",
        content: "nouveau contenu",
      };
      Ressource.update_note.mockResolvedValue({ success: true });

      await updateNote(req, res);

      expect(Ressource.update_note).toHaveBeenCalledWith(
        "user123",
        "note789",
        "nouveau contenu",
      );
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it("devrait retourner une erreur si l'ID est manquant", async () => {
      req.body.content = "nouveau contenu";

      await updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message:
          "L'identifiant de la ressource à mettre à jour est obligatoire",
      });
    });

    it("devrait retourner une erreur si le contenu est manquant", async () => {
      req.body.ressource_id = "note789";

      await updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Le nouveau contenu est obligatoire",
      });
    });
  });

  describe("createNote", () => {
    it("devrait créer une note", async () => {
      req.body = {
        ressource_name: "Note A",
        ressource_father_id: "parent321",
      };
      Ressource.create_note.mockResolvedValue({ success: true });

      await createNote(req, res);

      expect(Ressource.create_note).toHaveBeenCalledWith(
        "user123",
        "parent321",
        "Note A",
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it("devrait retourner une erreur si le nom est manquant", async () => {
      req.body.ressource_father_id = "parent321";

      await createNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Nom de la note obligatoire",
      });
    });

    it("devrait retourner une erreur si le parent est manquant", async () => {
      req.body.ressource_name = "Note A";

      await createNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Identifiant de la ressource parente obligatoire",
      });
    });
  });
});
