import { User } from "models/Models";

export default class AuthService {
  public async login(userName: string, password: string): Promise<User | undefined> {
    if (userName === "user" && password === "1234") {
      return { userName, email: "example@gmail.com" };
    } else return undefined;
  }
}
