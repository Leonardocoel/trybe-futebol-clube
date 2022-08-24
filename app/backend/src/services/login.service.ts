import validateCredentials from '../helpers/validateCredentials';
import { IPasswordService } from '../interfaces/Login/IPasswordService';
import { ILogin } from '../interfaces/Login/ILogin';
import User from '../database/models/user.model';
import { ITokenService } from '../interfaces/Login/ITokenService';
import { ILoginService } from '../interfaces/Login/ILoginService';

export default class LoginService implements ILoginService {
  private _passwordService: IPasswordService;
  private _tokenService: ITokenService;

  constructor(passwordService: IPasswordService, tokenService: ITokenService) {
    this._passwordService = passwordService;
    this._tokenService = tokenService;
  }

  async validateUser({ email, password }: ILogin): Promise<string> {
    validateCredentials(email, password);

    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }

    this._passwordService.check(password, user.password);

    const { password: _, ...userWithoutPassword } = user;

    const token = this._tokenService.sign(userWithoutPassword);

    return token;
  }

  validateToken(token: string): string {
    if (!token) {
      const error = new Error('Token not found');
      error.name = 'UNAUTHORIZED';
      throw error;
    }

    const { role } = this._tokenService.verify(token);

    return role;
  }
}
