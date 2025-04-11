import { describe, it, expect, vi } from "vitest";

import { UpdateNavMainCommand } from "@/models/AsyncCommand";
import LibraryManager from "@/models/LibraryManager";
import RessourceService from "@/services/RessourceService";
import NavItemAdapter from "@/models/NavItemAdapter";

describe("UpdateNavMainCommand", () => {
  it("should update the library with the new navigation structure", async () => {
    // Mock the response from RessourceService.getArborescence
    const mockNavStructure = NavItemAdapter.convertToNavItems({
      success: true,
      root: {
        public_root_ressource: "root_123",
        root_name: "Root",
      },
      arborescence: [
        {
          child_ressource_id: "folder_1",
          child_ressource_name: "Folder 1",
          child_ressource_nature: "dossier",
          parent_ressource_id: "root_123",
          parent_ressource_name: "Root",
        },
        {
          child_ressource_id: "note_1",
          child_ressource_name: "Note 1",
          child_ressource_nature: "note",
          parent_ressource_id: "root_123",
          parent_ressource_name: "Root",
        },
      ],
    });
    vi.spyOn(RessourceService, "getArborescence").mockResolvedValue(
      mockNavStructure,
    );

    // Mock the LibraryManager's updateLibrary method
    const updateLibrarySpy = vi.spyOn(
      LibraryManager.getInstance(),
      "updateLibrary",
    );

    // Execute the command
    const command = new UpdateNavMainCommand();
    await command.execute();

    // Assert that RessourceService.getArborescence was called
    expect(RessourceService.getArborescence).toHaveBeenCalled();

    // Assert that LibraryManager.updateLibrary was called with the correct data
    expect(updateLibrarySpy).toHaveBeenCalledWith(expect.any(Function));

    // Verify that the library's navMain was updated correctly
    const library = LibraryManager.getInstance().library;
    expect(library.navMain).toEqual(mockNavStructure);

    // Clean up mocks
    vi.restoreAllMocks();
  });
});
