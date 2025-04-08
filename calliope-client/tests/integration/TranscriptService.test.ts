import { describe, expect } from "vitest";
import TranscriptService from "@/services/TranscriptService";
import axios from "axios";
import UserService from "@/services/UserService";

beforeAll(async () => {
  // Set the base URL for axios
  axios.defaults.baseURL = "http://backend:5000";
  // Connect
  await UserService.signin("alice.dubois@example.com", "motdepasse123");
});

describe("TranscriptService", () => {
  it("should retrieve a transcript", async () => {
    const result = await TranscriptService.getTranscript(
      "eeeeeeee-2222-eeee-eeee-eeeeeeeeeeee",
    );

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });
});
