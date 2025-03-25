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
      console.error(error);
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
      console.error(error);
      return null;
    }
  }
}

export default UserService;
