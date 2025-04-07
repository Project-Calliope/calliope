import { vi, describe, it, expect } from "vitest";
import RessourceService from "@/services/RessourceService";
import axios from "axios";
import NavItemAdapter from "@/models/NavItemAdapter";

// Mock les modules nécessaires
vi.mock("axios");

describe("RessourceService", () => {
  describe("getArborescence", () => {
    it("should return the arborescence", async () => {
      type ApiResponse = {
        success: boolean;
        root: {
          public_root_ressource: string;
          root_name: string;
        };
        arborescence: {
          child_ressource_id: string;
          child_ressource_name: string;
          child_ressource_nature: "dossier" | "note";
          parent_ressource_id: string;
          parent_ressource_name: string;
        }[];
      };

      const mockResponseArborescence: ApiResponse = {
        success: true,
        root: {
          public_root_ressource: "root_1",
          root_name: "Root",
        },
        arborescence: [
          {
            child_ressource_id: "child_1",
            child_ressource_name: "Child 1",
            child_ressource_nature: "dossier",
            parent_ressource_id: "root_1",
            parent_ressource_name: "Root",
          },
          {
            child_ressource_id: "child_2",
            child_ressource_name: "Child 2",
            child_ressource_nature: "note",
            parent_ressource_id: "child_1",
            parent_ressource_name: "Child 1",
          },
        ],
      };

      const mockResponse = {
        data: mockResponseArborescence,
      };

      // Spy pour mocker la réponse de axios
      vi.spyOn(axios, "get").mockResolvedValue(mockResponse);

      const result = await RessourceService.getArborescence();

      const navMain = NavItemAdapter.convertToNavItems(mockResponse.data);
      expect(result).toEqual(navMain);
    });

    it("should throw an error if the request fails", async () => {
      // Spy pour mocker un échec
      vi.spyOn(axios, "get").mockRejectedValue(new Error("Network error"));

      await expect(RessourceService.getArborescence()).rejects.toThrow(
        "Network error",
      );
    });

    it("should throw an error if an unknown error occurs", async () => {
      // Spy pour mocker une erreur inconnue
      vi.spyOn(axios, "get").mockRejectedValue({});

      await expect(RessourceService.getArborescence()).rejects.toThrow(
        "An unknown error occurred",
      );
    });
  });

  describe("getNote", () => {
    it("should return the note data", async () => {
      const mockNoteResponseNote = {
        note: {
          note_title: "Test Note",
          note_content: "This is the note content",
        },
      };

      const mockNoteResponse = {
        data: mockNoteResponseNote,
      };

      // Spy pour mocker la réponse de axios
      vi.spyOn(axios, "get").mockResolvedValue(mockNoteResponse);

      const result = await RessourceService.getNote("123");
      expect(result).toEqual({
        note_title: "Test Note",
        note_content: "This is the note content",
      });
    });

    it("should throw an error if the request fails", async () => {
      vi.spyOn(axios, "get").mockRejectedValue(new Error("Network error"));

      await expect(RessourceService.getNote("123")).rejects.toThrow(
        "Network error",
      );
    });

    it("should throw an error if an unknown error occurs", async () => {
      vi.spyOn(axios, "get").mockRejectedValue({});

      await expect(RessourceService.getNote("123")).rejects.toThrow(
        "An unknown error occurred",
      );
    });
  });

  describe("createFolder", () => {
    it("should create a new folder", async () => {
      const mockResponse = {
        success: true,
        data: { folderId: "new-folder-id" },
      };

      vi.spyOn(axios, "post").mockResolvedValue(mockResponse);

      const result = await RessourceService.createFolder(
        "parent-id",
        "New Folder",
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error if the request fails", async () => {
      vi.spyOn(axios, "post").mockRejectedValue(new Error("Network error"));

      await expect(
        RessourceService.createFolder("parent-id", "New Folder"),
      ).rejects.toThrow("Network error");
    });

    it("should throw an error if an unknown error occurs", async () => {
      vi.spyOn(axios, "post").mockRejectedValue({});

      await expect(
        RessourceService.createFolder("parent-id", "New Folder"),
      ).rejects.toThrow("An unknown error occurred");
    });
  });

  describe("createNote", () => {
    it("should create a new note", async () => {
      const mockResponse = {
        success: true,
        data: { noteId: "new-note-id" },
      };

      vi.spyOn(axios, "post").mockResolvedValue(mockResponse);

      const result = await RessourceService.createNote("folder-id", "New Note");
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error if the request fails", async () => {
      vi.spyOn(axios, "post").mockRejectedValue(new Error("Network error"));

      await expect(
        RessourceService.createNote("folder-id", "New Note"),
      ).rejects.toThrow("Network error");
    });

    it("should throw an error if an unknown error occurs", async () => {
      vi.spyOn(axios, "post").mockRejectedValue({});

      await expect(
        RessourceService.createNote("folder-id", "New Note"),
      ).rejects.toThrow("An unknown error occurred");
    });
  });

  describe("updateNote", () => {
    it("should update the note content", async () => {
      const mockResponse = { success: true };

      vi.spyOn(axios, "put").mockResolvedValue(mockResponse);

      await expect(
        RessourceService.updateNote("note-id", "Updated content"),
      ).resolves.not.toThrow();
    });

    it("should throw an error if the request fails", async () => {
      vi.spyOn(axios, "put").mockRejectedValue(new Error("Network error"));

      await expect(
        RessourceService.updateNote("note-id", "Updated content"),
      ).rejects.toThrow("Network error");
    });

    it("should throw an error if an unknown error occurs", async () => {
      vi.spyOn(axios, "put").mockRejectedValue({});

      await expect(
        RessourceService.updateNote("note-id", "Updated content"),
      ).rejects.toThrow("An unknown error occurred");
    });
  });
});
