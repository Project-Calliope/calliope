import User from "@/models/User";
import UserAdapter from "@/models/UserAdapter";
import axios from "axios";

class UserService {
  static async signin(email: string, password: string): Promise<User | null> {
    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return UserAdapter.adapt(response.data);
    } catch (error) {
      console.error("Error during sign-in:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }
  }

  static async signup(
    username: string,
    password: string,
    email: string,
  ): Promise<User | null> {
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        password,
        email,
      });
      return UserAdapter.adapt(response.data);
    } catch (error) {
      console.error("Error during sign-up:", error);
      return null;
    }
  }

  static async whoami(): Promise<User | null> {
    try {
      const response = await axios.get("/api/auth/whoami", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const user = UserAdapter.adapt(response.data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Error during whoami:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }
  }

  static async logout(): Promise<void> {
    try {
      await axios.post("/api/auth/logout", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export default UserService;
