import { vi, describe, it, expect } from "vitest";
import { LoadTranscriptCommand } from "@/models/AsyncCommand";
import TranscriptService from "@/services/TranscriptService";
import LibraryManager from "@/models/LibraryManager";
import Transcript from "@/models/Transcript"; // si utilisé dans `execute`

describe("LoadTranscriptCommand", () => {
  it("should load a transcript and update the library", async () => {
    const mockPublicNoteId = "note_123";
    const mockResponse = {
      success: true,
      result: {
        transcript_content: "This is a test transcript content.",
        transcript_audioname: "test_audio.mp3",
        transcript_audiosize: 123456,
        public_id: "transcript_123",
      },
    };

    // Mock TranscriptService
    const getTranscriptMock = vi
      .spyOn(TranscriptService, "getTranscript")
      .mockResolvedValue(mockResponse);

    const updateLibraryMock = vi.spyOn(
      LibraryManager.getInstance(),
      "updateLibrary",
    );

    // Crée et exécute la commande
    const command = new LoadTranscriptCommand(mockPublicNoteId);
    await command.execute();

    // Vérifie que getTranscript a bien été appelé
    expect(getTranscriptMock).toHaveBeenCalledWith(mockPublicNoteId);

    // Vérifie que la mise à jour de la librairie a bien eu lieu
    expect(updateLibraryMock).toHaveBeenCalled();

    expect(LibraryManager.getInstance().library.currentTranscript).toEqual(
      new Transcript(
        mockResponse.result.transcript_content,
        mockResponse.result.transcript_audioname,
        mockResponse.result.transcript_audiosize,
        mockResponse.result.public_id,
      ),
    );

    // Nettoyage
    vi.restoreAllMocks();
  });

  it("should handle errors correctly", async () => {
    const mockPublicNoteId = "note_123";
    const mockError = new Error("Network error");

    // Mock TranscriptService to throw an error
    vi.spyOn(TranscriptService, "getTranscript").mockRejectedValue(mockError);

    // Crée et exécute la commande
    const command = new LoadTranscriptCommand(mockPublicNoteId);

    // Vérifie que l'erreur est bien lancée
    await expect(command.execute()).rejects.toThrow("Network error");

    // Nettoyage
    vi.restoreAllMocks();
  });
  it("should handle unknown errors correctly", async () => {
    const mockPublicNoteId = "note_123";

    // Mock TranscriptService to throw an unknown error
    vi.spyOn(TranscriptService, "getTranscript").mockRejectedValue({});

    // Crée et exécute la commande
    const command = new LoadTranscriptCommand(mockPublicNoteId);

    // Vérifie que l'erreur est bien lancée
    await expect(command.execute()).rejects.toThrow(
      "An unknown error occurred",
    );

    // Nettoyage
    vi.restoreAllMocks();
  });
  it("should handle null response correctly", async () => {
    const mockPublicNoteId = "note_123";
    const mockResponse = {
      success: true,
      result: null,
    };

    // Mock TranscriptService
    vi.spyOn(TranscriptService, "getTranscript").mockResolvedValue(
      mockResponse,
    );

    // Crée et exécute la commande
    const command = new LoadTranscriptCommand(mockPublicNoteId);
    await command.execute();

    // Vérifie que la mise à jour de la librairie a bien eu lieu
    expect(LibraryManager.getInstance().library.currentTranscript).toBeNull();

    // Nettoyage
    vi.restoreAllMocks();
  });
  it("should handle empty response correctly", async () => {
    const mockPublicNoteId = "note_123";
    const mockResponse = {
      success: true,
      result: {
        transcript_content: "",
        transcript_audioname: "",
        transcript_audiosize: 0,
        public_id: "",
      },
    };
    // Mock TranscriptService
    vi.spyOn(TranscriptService, "getTranscript").mockResolvedValue(
      mockResponse,
    );
    // Crée et exécute la commande
    const command = new LoadTranscriptCommand(mockPublicNoteId);
    await command.execute();
    // Vérifie que la mise à jour de la librairie a bien eu lieu
    expect(LibraryManager.getInstance().library.currentTranscript).toEqual(
      new Transcript(
        mockResponse.result.transcript_content,
        mockResponse.result.transcript_audioname,
        mockResponse.result.transcript_audiosize,
        mockResponse.result.public_id,
      ),
    );
    // Nettoyage
    vi.restoreAllMocks();
  });
});
