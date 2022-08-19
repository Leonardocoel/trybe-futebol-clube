export interface IUser{
  username: string;
  role: string;
  email: string;
}

export interface UserDTO extends IUser {
  id: number;
}

export interface IUserWithPassword extends UserDTO {
  password: string;
}
