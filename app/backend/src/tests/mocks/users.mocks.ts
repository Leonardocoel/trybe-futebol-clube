import { ILogin } from "../../interfaces/Login/ILogin"
import {  IUserWithPassword, UserDTO } from "../../interfaces/IUser"

export const validUser: IUserWithPassword = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

export const validUserDTO: UserDTO= {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
}

export const validLogin: ILogin = {
  email: "user@user.com",
  password: "secret_user"
}

export const invalidLogin: ILogin = {
  email: "user@admin.com" ,
  password: "admin"
}

export const token = 'any-token'