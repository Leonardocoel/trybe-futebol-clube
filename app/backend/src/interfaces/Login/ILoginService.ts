import { ILogin } from './ILogin';

export interface ILoginService {
  validateUser(user: ILogin): Promise<string>;
  validateToken(token: string): void;
}
