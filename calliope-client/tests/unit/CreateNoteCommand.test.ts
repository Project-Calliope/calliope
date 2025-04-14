import { vi, describe, it, expect } from "vitest";
import { CreateNoteCommand } from "@/models/AsyncCommand";
import RessourceService from "@/services/RessourceService";

describe("CreateNoteCommand", () => {
  it("should create a note and return the note ID", async () => {
    const mockFatherRessourceId = "father_ressource_id";
    const mockNoteName = "New Note";
    const mockResponse = {
      success: true,
      public_ressource_id: "note_123",
    };

    // Mock the response from RessourceService.createNote
    vi.spyOn(RessourceService, "createNote").mockResolvedValue(mockResponse);

    // Create the command
    const command = new CreateNoteCommand(mockFatherRessourceId, mockNoteName);

    // Execute the command
    await command.execute();

    // Assert that RessourceService.createNote was called with the correct arguments
    expect(RessourceService.createNote).toHaveBeenCalledWith(
      mockFatherRessourceId,
      mockNoteName,
    );

    // Clean up mocks

    vi.restoreAllMocks();
  });

  it("should throw an error if note creation fails", async () => {
    const mockFatherRessourceId = "father_ressource_id";
    const mockNoteName = "New Note";

    // Mock the response from RessourceService.createNote to throw an error
    vi.spyOn(RessourceService, "createNote").mockRejectedValue(
      new Error("Failed to create note"),
    );

    // Create the command
    const command = new CreateNoteCommand(mockFatherRessourceId, mockNoteName);

    // Execute the command and assert that it throws an error
    await expect(command.execute()).rejects.toThrow("Failed to create note");

    // Clean up mocks
    vi.restoreAllMocks();
  });

  it("should throw an error if an unknown error occurs", async () => {
    const mockFatherRessourceId = "father_ressource_id";
    const mockNoteName = "New Note";

    // Mock the response from RessourceService.createNote to throw an unknown error
    vi.spyOn(RessourceService, "createNote").mockRejectedValue({});

    // Create the command
    const command = new CreateNoteCommand(mockFatherRessourceId, mockNoteName);

    // Execute the command and assert that it throws an error
    await expect(command.execute()).rejects.toThrow(
      "An unknown error occurred",
    );

    // Clean up mocks
    vi.restoreAllMocks();
  });
});
