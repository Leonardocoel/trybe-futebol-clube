import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILogin } from '../interfaces/Login/ILogin';
import { ILoginService } from '../interfaces/Login/ILoginService';

export default class LoginController {
  constructor(
    private loginService: ILoginService,
  ) {}

  async sign(req: Request, res: Response): Promise<void> {
    const user = req.body as ILogin;

    const token = await this.loginService.validateUser(user);

    res.status(StatusCodes.OK).json({ token });
  }

  validate(req: Request, res: Response): void {
    const { authorization } = req.headers;

    const role = this.loginService.validateToken(authorization as string);

    res.status(StatusCodes.OK).json({ role });
  }
}
