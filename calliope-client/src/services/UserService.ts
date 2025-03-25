import User from "@/models/User";
import UserAdapter from "@/models/UserAdapter";
import axios from "axios";

class UserService {
  static async signin(
    username: string,
    password: string,
  ): Promise<User | null> {
    try {
      const response = await axios.post("/api/auth/signin", {
        username,
        password,
      });
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
