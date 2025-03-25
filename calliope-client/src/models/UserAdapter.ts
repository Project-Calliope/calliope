import User from "@/models/User";

class UserAdapter {
  public static adapt(data: any): User {
    return new User(
      data.user.public_user_id,
      data.user.username,
      data.user.email,
    );
  }
}

export default UserAdapter;
