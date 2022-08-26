import LoginController from '../controllers/login.controller';
import TokenMiddleware from '../middlewares/token.middleware';
import LoginService from '../services/login.service';
import jwtService from '../services/jwt.service';
import PasswordService from '../services/password.service';

const loginService = new LoginService(PasswordService, jwtService);

export const loginController = new LoginController(loginService);
export const tokenMiddleware = new TokenMiddleware(loginService);
