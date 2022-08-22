import { Router } from 'express';
import jwtService from '../services/jwt.service';
import PasswordService from '../services/password.service';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';

const router = Router();

const loginService = new LoginService(PasswordService, jwtService);
const loginController = new LoginController(loginService);

router.post('/', (req, res) => loginController.sign(req, res));
router.get('/validate', (req, res) => loginController.validate(req, res));

export default router;
