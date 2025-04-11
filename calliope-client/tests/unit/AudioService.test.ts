import { vi, describe, it, expect } from "vitest";
import AudioService from "@/services/AudioService";

describe("AudioService", () => {
  it("should upload audio file", async () => {
    const mockFile = new File([""], "test.mp3");
    const mockFatherRessourceId = "father_ressource_id";

    // Mock the response from axios
    vi.spyOn(AudioService, "upload").mockResolvedValue({
      success: true,
      public_ressource_id: "audio_123",
    });

    // Execute the upload method
    const response = await AudioService.upload(mockFile, mockFatherRessourceId);

    // Assert that the response is as expected
    expect(response).toEqual({
      success: true,
      public_ressource_id: "audio_123",
    });

    // Assert that the upload method was called with the correct arguments
    expect(AudioService.upload).toHaveBeenCalledWith(
      mockFile,
      mockFatherRessourceId,
    );

    // Clean up mocks
    vi.restoreAllMocks();
  });
});
it("should throw an error if upload fails", async () => {
  const mockFile = new File([""], "test.mp3");
  const mockFatherRessourceId = "father_ressource_id";

  // Mock the response from axios to throw an error
  vi.spyOn(AudioService, "upload").mockRejectedValue(
    new Error("Upload failed"),
  );

  // Execute the upload method and assert that it throws an error
  await expect(
    AudioService.upload(mockFile, mockFatherRessourceId),
  ).rejects.toThrow("Upload failed");

  // Clean up mocks
  vi.restoreAllMocks();
});
it("should throw an error if an unknown error occurs", async () => {
  const mockFile = new File([""], "test.mp3");
  const mockFatherRessourceId = "father_ressource_id";

  // Mock the response from axios to throw an unknown error
  vi.spyOn(AudioService, "upload").mockRejectedValue({});

  // Execute the upload method and assert that it throws an error
  await expect(
    AudioService.upload(mockFile, mockFatherRessourceId),
  ).rejects.toThrow();

  // Clean up mocks
  vi.restoreAllMocks();
});
it("should handle network errors correctly", async () => {
  const mockFile = new File([""], "test.mp3");
  const mockFatherRessourceId = "father_ressource_id";

  // Mock the response from axios to throw a network error
  vi.spyOn(AudioService, "upload").mockRejectedValue(
    new Error("Network error"),
  );

  // Execute the upload method and assert that it throws a network error
  await expect(
    AudioService.upload(mockFile, mockFatherRessourceId),
  ).rejects.toThrow("Network error");

  // Clean up mocks
  vi.restoreAllMocks();
});
