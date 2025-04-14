import { vi, describe, it, expect } from "vitest";
import { CreateFolderCommand } from "@/models/AsyncCommand";
import RessourceService from "@/services/RessourceService";

describe("CreateFolderCommand", () => {
  it("should send a request to create a folder", async () => {
    const mockPublicFatherId = "father_ressource_id";
    const mockFolderName = "New Folder";

    // Mock the response from RessourceService.createFolder
    vi.spyOn(RessourceService, "createFolder").mockResolvedValue({
      success: true,
    });

    // Create the command
    const command = new CreateFolderCommand(mockPublicFatherId, mockFolderName);

    // Execute the command
    await command.execute();

    // Assert that RessourceService.createFolder was called with the correct arguments
    expect(RessourceService.createFolder).toHaveBeenCalledWith(
      mockPublicFatherId,
      mockFolderName,
    );

    // Clean up mocks
    vi.restoreAllMocks();
  });
  it("should throw an error if folder creation fails", async () => {
    const mockPublicFatherId = "father_ressource_id";
    const mockFolderName = "New Folder";

    // Mock the response from RessourceService.createFolder to throw an error
    vi.spyOn(RessourceService, "createFolder").mockRejectedValue(
      new Error("Failed to create folder"),
    );

    // Create the command
    const command = new CreateFolderCommand(mockPublicFatherId, mockFolderName);

    // Execute the command and assert that it throws an error
    await expect(command.execute()).rejects.toThrow("Failed to create folder");

    // Clean up mocks
    vi.restoreAllMocks();
  });
  it("should throw an error if an unknown error occurs", async () => {
    const mockPublicFatherId = "father_ressource_id";
    const mockFolderName = "New Folder";

    // Mock the response from RessourceService.createFolder to throw an unknown error
    vi.spyOn(RessourceService, "createFolder").mockRejectedValue({});

    // Create the command
    const command = new CreateFolderCommand(mockPublicFatherId, mockFolderName);

    // Execute the command and assert that it throws an error
    await expect(command.execute()).rejects.toThrow(
      "An unknown error occurred",
    );

    // Clean up mocks
    vi.restoreAllMocks();
  });
  it("should throw an error if the folder name is empty", async () => {
    const mockPublicFatherId = "father_ressource_id";
    const mockFolderName = "";

    // Mock the response from RessourceService.createFolder to throw an error
    vi.spyOn(RessourceService, "createFolder").mockRejectedValue(
      new Error("Folder name cannot be empty"),
    );

    // Create the command
    const command = new CreateFolderCommand(mockPublicFatherId, mockFolderName);

    // Execute the command and assert that it throws an error
    await expect(command.execute()).rejects.toThrow(
      "Folder name cannot be empty",
    );

    // Clean up mocks
    vi.restoreAllMocks();
  });
  it("should throw an error if the public father ID is empty", async () => {
    const mockPublicFatherId = "";
    const mockFolderName = "New Folder";

    // Mock the response from RessourceService.createFolder to throw an error
    vi.spyOn(RessourceService, "createFolder").mockRejectedValue(
      new Error("Public father ID cannot be empty"),
    );

    // Create the command
    const command = new CreateFolderCommand(mockPublicFatherId, mockFolderName);

    // Execute the command and assert that it throws an error
    await expect(command.execute()).rejects.toThrow(
      "Public father ID cannot be empty",
    );

    // Clean up mocks
    vi.restoreAllMocks();
  });
});
