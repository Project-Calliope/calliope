import { describe, expect, it, beforeAll } from "vitest";
import RessourceService from "@/services/RessourceService";
import axios from "axios";
import UserService from "@/services/UserService";

describe("RessourceService", () => {
  beforeAll(async () => {
    axios.defaults.baseURL = "http://backend:5000";
    await UserService.signin("alice.dubois@example.com", "motdepasse123");
  });

  it("devrait récupérer une arborescence contenant des éléments", async () => {
    const arborescence = await RessourceService.getArborescence();

    expect(arborescence).toBeDefined();
    expect(arborescence?.items.length).toBeGreaterThan(0);

    // Vérifie récursivement que chaque NavItem a un titre, une nature, une url
    interface NavItem {
      title: string;
      nature: "dossier" | "note";
      url: string;
      items?: NavItem[];
    }

    const validateItem = (item: NavItem) => {
      expect(item.title).toBeTruthy();
      expect(item.nature).toMatch(/dossier|note/);
      expect(item.url).toBeTruthy();

      item.items?.forEach(validateItem);
    };

    arborescence?.items.forEach(validateItem);
  });

  it("should retrieve a note", async () => {
    const note = await RessourceService.getNote(
      "eeeeeeee-2222-eeee-eeee-eeeeeeeeeeee",
    );

    expect(note).toBeDefined();
    expect(note?.note_title).toBe("Réunion équipe");
    expect(note?.note_content).toBe(
      "Points à aborder lors de la réunion:\n1. Avancement du projet\n2. Problèmes rencontrés\n3. Planning des prochaines semaines\n4. Questions diverses",
    );
  });

  it("should create a folder", async () => {
    const folderName = "Nouveau Dossier";
    const parentFolderId = "aaaaaaaa-2222-aaaa-aaaa-aaaaaaaaaaaa";

    const response = await RessourceService.createFolder(
      parentFolderId,
      folderName,
    );

    expect(response).toBeDefined();
    expect(response.success).toBe(true);
  });

  it("should throw an error when creating a folder with invalid data", async () => {
    const invalidFolderName = ""; // Invalid name
    const parentFolderId = "aaaaaaaa-2222-aaaa-aaaa-aaaaaaaaaaaa";

    await expect(
      RessourceService.createFolder(parentFolderId, invalidFolderName),
    ).rejects.toThrowError();
  });

  it("should create a note", async () => {
    const noteTitle = "Nouvelle Note";
    const parentFolderId = "aaaaaaaa-2222-aaaa-aaaa-aaaaaaaaaaaa";

    const response = await RessourceService.createNote(
      parentFolderId,
      noteTitle,
    );

    expect(response).toBeDefined();
    expect(response.success).toBe(true);
  });

  it("should throw an error when creating a note with invalid data", async () => {
    const invalidNoteTitle = ""; // Invalid title
    const parentFolderId = "aaaaaaaa-2222-aaaa-aaaa-aaaaaaaaaaaa";

    await expect(
      RessourceService.createNote(parentFolderId, invalidNoteTitle),
    ).rejects.toThrowError();
  });

  it("should save a note", async () => {
    const newContent = "Contenu mis à jour de la note";
    const noteId = "eeeeeeee-2222-eeee-eeee-eeeeeeeeeeee";

    await RessourceService.updateNote(noteId, newContent);

    const updatedNote = await RessourceService.getNote(noteId);

    expect(updatedNote).toBeDefined();
    expect(updatedNote?.note_title).toBe("Réunion équipe");
    expect(updatedNote?.note_content).toBe(newContent);
  });
});
