import { Router } from 'express';

import MatchesController from '../controllers/matches.controller';
import { tokenMiddleware } from '../factory/login.factory';

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.use((req, res, next) => tokenMiddleware.validation(req, res, next));
router.post('/', MatchesController.createMatch);

export default router;
