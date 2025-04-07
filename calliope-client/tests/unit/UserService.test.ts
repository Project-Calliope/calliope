import { vi, describe, it, expect } from "vitest";
import UserService from "@/services/UserService";
import axios from "axios";
import User from "@/models/User";

// Mock axios
vi.mock("axios");

describe("UserService", () => {
  describe("signin", () => {
    it("should return a user if signin is successful", async () => {
      const mockResponse = {
        data: {
          user: {
            public_user_id: "1",
            username: "testUser",
            email: "test@test.fr",
          },
          token: "fake-token",
        },
      };
      const user = new User(
        mockResponse.data.user.public_user_id,
        mockResponse.data.user.username,
        mockResponse.data.user.email,
      );

      // Mock axios response
      vi.spyOn(axios, "post").mockResolvedValue(mockResponse);

      const result = await UserService.signin(
        "test@example.com",
        "password123",
      );
      expect(result).toEqual(user);
      expect(localStorage.getItem("token")).toBe("fake-token");
    });

    it("should return null if signin fails", async () => {
      vi.spyOn(axios, "post").mockRejectedValue(new Error("Signin failed"));

      const result = await UserService.signin(
        "test@example.com",
        "wrongpassword",
      );
      expect(result).toBeNull();
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  describe("signup", () => {
    it("should return a user if signup is successful", async () => {
      const mockResponse = {
        data: {
          user: {
            public_user_id: "1",
            username: "testUser",
            email: "test@test.fr",
          },
        },
      };

      const user = new User(
        mockResponse.data.user.public_user_id,
        mockResponse.data.user.username,
        mockResponse.data.user.email,
      );

      // Mock axios response
      vi.spyOn(axios, "post").mockResolvedValue(mockResponse);

      const result = await UserService.signup(
        "newUser",
        "password123",
        "new@example.com",
      );
      expect(result).toEqual(user);
    });

    it("should return null if signup fails", async () => {
      vi.spyOn(axios, "post").mockRejectedValue(new Error("Signup failed"));

      const result = await UserService.signup(
        "newUser",
        "password123",
        "new@example.com",
      );
      expect(result).toBeNull();
    });
  });

  describe("whoami", () => {
    it("should return a user if the token is valid", async () => {
      const mockResponse = {
        data: {
          user: {
            public_user_id: "1",
            username: "testUser",
            email: "test@test.fr",
          },
          token: "fake-token",
        },
      };

      const mockUser = new User(
        mockResponse.data.user.public_user_id,
        mockResponse.data.user.username,
        mockResponse.data.user.email,
      );

      // Mock axios response
      vi.spyOn(axios, "get").mockResolvedValue(mockResponse);

      const result = await UserService.whoami();
      expect(result).toEqual(mockUser);
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
    });

    it("should return null and remove token and user if whoami fails", async () => {
      vi.spyOn(axios, "get").mockRejectedValue(new Error("Invalid token"));

      const result = await UserService.whoami();
      expect(result).toBeNull();
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("logout", () => {
    it("should remove token and user from localStorage", async () => {
      // Mock axios response
      vi.spyOn(axios, "post").mockResolvedValue({ data: {} });

      await UserService.logout();

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });

    it("should handle errors during logout", async () => {
      // Mock axios to simulate error
      vi.spyOn(axios, "post").mockRejectedValue(new Error("Logout failed"));

      await UserService.logout();

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });
});
