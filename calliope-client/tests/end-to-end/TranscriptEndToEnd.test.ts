import axios from "axios";
import UserService from "@/services/UserService";
import AudioService from "@/services/AudioService";
import { vi, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import { LoadNoteCommand } from "@/models/AsyncCommand";
import LibraryManager from "@/models/LibraryManager";

// Increase the test timeout to 120000ms
vi.setConfig({ testTimeout: 120000 });

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

    // Verify is the file is stored in the database

    const libraryManager = LibraryManager.getInstance();
    const library = libraryManager.library;

    // Wait for the note to be loaded
    await new LoadNoteCommand(result.public_ressource_id).execute();

    expect(library.currentNote.content).toBe(
      " But, with full ravishment the hours of prime, singing, received they in the midst of leaves that ever bore a burden to their rhymes.",
    );
    expect(library.currentNote.title).toBe("test_audio.wav");
    expect(library.currentNote.public_ressource_id).toBe(
      result.public_ressource_id,
    );

    // Verify the library.transcript
    expect(library.currentTranscript).toBeDefined();
    expect(library.currentTranscript?.content).toBe(
      " But, with full ravishment the hours of prime, singing, received they in the midst of leaves that ever bore a burden to their rhymes.",
    );
    expect(library.currentTranscript?.audioname).toBe("test_audio.wav");
    expect(library.currentTranscript?.audiosize).toBe(269998);
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
