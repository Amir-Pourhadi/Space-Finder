import { User, UserAttribute, UserCredential } from "models/Models";

export const wrongCredential: UserCredential = { userName: "UserName", password: "PassWord" };
export const correctCredential: UserCredential = { userName: "user", password: "1234" };

export const correctUserInfo: User = { userName: "user", email: "example@gmail.com" };
export const correctUserDesc: UserAttribute[] = [
  { name: "Description", value: "Best user ever!" },
  { name: "Job", value: "Engineer" },
  { name: "Age", value: "25" },
  { name: "Experience", value: "3 years" },
];
