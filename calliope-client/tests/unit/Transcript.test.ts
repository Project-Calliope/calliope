import { vi, describe, it, expect } from "vitest";
import TranscriptService from "@/services/TranscriptService";
import axios from "axios";

// Mock le module axios

describe("TranscriptService", () => {
  vi.mock("axios");
  describe("getTranscript", () => {
    it("should return transcript data", async () => {
      const mockResponse = {
        success: true,
        data: {
          transcript_id: "123",
          transcript_text: "This is the transcript text",
        },
      };

      // Spy pour mocker la réponse de axios
      vi.spyOn(axios, "get").mockResolvedValue(mockResponse);

      const result = await TranscriptService.getTranscript("123");
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error if the request fails", async () => {
      vi.spyOn(axios, "get").mockRejectedValue(new Error("Network error"));

      await expect(TranscriptService.getTranscript("123")).rejects.toThrow(
        "Network error",
      );
    });

    it("should throw an error if an unknown error occurs", async () => {
      vi.spyOn(axios, "get").mockRejectedValue({});

      await expect(TranscriptService.getTranscript("123")).rejects.toThrow(
        "An unknown error occurred",
      );
    });
  });
});
