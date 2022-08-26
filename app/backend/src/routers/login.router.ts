import { Router } from 'express';
import { loginController } from '../factory/login.factory';

const router = Router();

router.post('/', (req, res) => loginController.sign(req, res));
router.get('/validate', (req, res) => loginController.validate(req, res));

export default router;
