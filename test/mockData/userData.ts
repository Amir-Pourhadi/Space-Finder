import { User, UserCredential } from "models/Models";

export const wrongCredential: UserCredential = { userName: "UserName", password: "PassWord" };
export const correctCredential: UserCredential = { userName: "user", password: "1234" };

export const correctUserInfo: User = { userName: "user", email: "example@gmail.com" };
