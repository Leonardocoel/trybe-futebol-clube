import { UserDTO } from './IUser';

export interface ITokenService {
  sign(user: UserDTO): string;
  verify(token: string): UserDTO;
}
