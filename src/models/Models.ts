export interface User {
  userName: string;
  email: string;
}

export interface UserAttribute {
  name: string;
  value: string;
}

export interface Space {
  id: string;
  name: string;
  location: string;
  photoUrl?: string;
}
