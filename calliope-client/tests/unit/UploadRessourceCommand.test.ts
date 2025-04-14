import { vi, describe, it, expect } from "vitest";
import { UploadRessourceCommand } from "@/models/AsyncCommand";
import AudioService from "@/services/AudioService";

import { LoadNoteCommand } from "@/models/AsyncCommand";

describe("UploadRessourceCommand", () => {
  it("should upload a file and trigger LoadNoteCommand", async () => {
    const mockFile = new File([""], "test.txt");
    const mockFatherRessourceId = "father_ressource_id";
    const mockResponse = {
      success: true,
      public_ressource_id: "ressource_id",
      note_id: "note_id",
    };

    // Mock the services
    vi.spyOn(AudioService, "upload").mockResolvedValue(mockResponse);
    vi.spyOn(LoadNoteCommand.prototype, "execute").mockResolvedValue();

    // Create the command
    const command = new UploadRessourceCommand(mockFile, mockFatherRessourceId);

    // Execute the command
    await command.execute();

    // Assert that RessourceService.uploadRessource was called with the correct arguments
    expect(AudioService.upload).toHaveBeenCalledWith(
      mockFile,
      mockFatherRessourceId,
    );

    // Assert that LoadNoteCommand was executed
    expect(LoadNoteCommand.prototype.execute).toHaveBeenCalled();

    // Clean up mocks
    vi.restoreAllMocks();
  });
});
