/**
 * Represents a User model with properties for public user ID, username, and email.
 * This class provides getter methods to access these properties.
 */
class User {
  private _public_user_id: string;
  private _username: string;
  private _email: string;

  constructor(public_user_id: string, username: string, email: string) {
    this._public_user_id = public_user_id;
    this._username = username;
    this._email = email;
  }

  public get public_user_id(): string {
    return this._public_user_id;
  }

  public get getUsername(): string {
    return this._username;
  }

  public get getEmail(): string {
    return this._email;
  }
}

export default User;
