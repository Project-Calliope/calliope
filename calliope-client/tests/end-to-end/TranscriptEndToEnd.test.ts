import TranscriptService from "@/services/TranscriptService";
import axios from "axios";
import UserService from "@/services/UserService";
import AudioService from "@/services/AudioService";
import { vi, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("AudioService", () => {
  beforeAll(async () => {
    axios.defaults.baseURL = "http://backend:5000";
    await UserService.signin("alice.dubois@example.com", "motdepasse123");
  });

  it("should upload audio file successfully", async () => {
    // Use real audio file
    const audioBuffer = readFileSync(path.join(__dirname, "test_audio.wav"));
    const realFile = new File([audioBuffer], "test_audio.wav", {
      type: "audio/wav",
    });
    const fatherId = "aaaaaaaa-2222-aaaa-aaaa-aaaaaaaaaaaa";

    // Call upload
    const result = await AudioService.upload(realFile, fatherId);

    // Verify response that the file was uploaded successfully
    expect(result).toEqual({
      success: true,
      public_ressource_id: expect.any(String),
    });
  });

  it("should handle upload errors", async () => {
    // Mock axios to throw error
    vi.spyOn(axios, "post").mockRejectedValue(new Error("Upload failed"));

    const audioBuffer = readFileSync(path.join(__dirname, "test_audio.wav"));
    const realFile = new File([audioBuffer], "test_audio.wav", {
      type: "audio/wav",
    });

    // Verify error is thrown
    await expect(AudioService.upload(realFile, "test-id")).rejects.toThrow(
      "Upload failed",
    );
  });
});
