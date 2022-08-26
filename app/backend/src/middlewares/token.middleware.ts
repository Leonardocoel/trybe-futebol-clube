import { Request, Response, NextFunction } from 'express';
import { ILoginService } from '../interfaces/Login/ILoginService';

export default class TokenMiddleware {
  constructor(
    private loginService: ILoginService,
  ) {}

  validation(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    this.loginService.validateToken(authorization as string);

    next();
  }
}
