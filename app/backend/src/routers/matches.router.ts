import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', MatchesController.getAllMatches);

export default router;
