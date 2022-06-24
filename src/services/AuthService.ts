import { User, UserAttribute } from "models/Models";

export default class AuthService {
  public async login(userName: string, password: string): Promise<User | undefined> {
    if (userName === "user" && password === "1234") {
      return { userName, email: "example@gmail.com" };
    } else return undefined;
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    return [
      { name: "Description", value: "Best user ever!" },
      { name: "Job", value: "Engineer" },
      { name: "Age", value: "25" },
      { name: "Experience", value: "3 years" },
    ];
  }
}
