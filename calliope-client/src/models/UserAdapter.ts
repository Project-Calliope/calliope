import User from "@/models/User";

/**
 * UserAdapter is a utility class that converts raw user data
 * from the API into a User model instance.
 */
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
