import { vi, describe, it, expect } from "vitest";
import { LoadNoteCommand, LoadTranscriptCommand } from "@/models/AsyncCommand";
import RessourceService from "@/services/RessourceService";
import LibraryManager from "@/models/LibraryManager";

describe("LoadNoteCommand", () => {
  it("should load a note and update the library", async () => {
    const mockPublicNoteId = "note_123";
    const mockResponse = {
      note_content: "This is a test note content.",
      note_title: "Test Note Title",
    };

    // Mock the services
    vi.spyOn(RessourceService, "getNote").mockResolvedValue(mockResponse);
    vi.spyOn(LibraryManager.getInstance(), "updateLibrary").mockImplementation(
      (callback) => {
        callback(LibraryManager.getInstance().library);
      },
    );
    vi.spyOn(LoadTranscriptCommand.prototype, "execute").mockResolvedValue();

    // Create the command
    const command = new LoadNoteCommand(mockPublicNoteId);

    // Execute the command
    await command.execute();

    // Assert that RessourceService.getNote was called with the correct arguments
    expect(RessourceService.getNote).toHaveBeenCalledWith(mockPublicNoteId);

    // Assert that LibraryManager.updateLibrary was called
    expect(LibraryManager.getInstance().updateLibrary).toHaveBeenCalled();

    // Assert that LoadTranscriptCommand was executed
    expect(LoadTranscriptCommand.prototype.execute).toHaveBeenCalled();

    // Clean up mocks
    vi.restoreAllMocks();
  });
});
