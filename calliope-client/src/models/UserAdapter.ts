import User from "@/models/User";

class UserAdapter {
  public static adapt(data: {
    user: { public_user_id: string; username: string; email: string };
  }): User {
    return new User(
      data.user.public_user_id,
      data.user.username,
      data.user.email,
    );
  }
}

export default UserAdapter;
