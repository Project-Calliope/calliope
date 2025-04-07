import { describe, it, expect, beforeAll } from "vitest";
import UserService from "@/services/UserService";
import axios from "axios";
import User from "@/models/User";

beforeAll(() => {
  axios.defaults.baseURL = "http://backend:5000";
});

describe("UserService Integration", () => {
  it("should sign up a user", async () => {
    const user = await UserService.signup(
      "testuser",
      "testpassword123",
      "test@example.com",
    );

    const returnUser = new User(
      user?.public_user_id || "",
      "testuser",
      "test@example.com",
    );
    expect(user).toEqual(returnUser);
  });

  it("should sign in a user", async () => {
    const email = "alice.dubois@example.com";
    const password = "motdepasse123";

    const user = await UserService.signin(email, password);
    const returnUser = new User(
      "11111111-2222-1111-1111-111111111111",
      "alice_dubois",
      "alice.dubois@example.com",
    );

    expect(user).toEqual(returnUser);
  });
  it("should get the current user", async () => {
    const user = await UserService.whoami();
    const returnUser = new User(
      "11111111-2222-1111-1111-111111111111",
      "alice_dubois",
      "alice.dubois@example.com",
    );
    expect(user).toEqual(returnUser);
  });
});
