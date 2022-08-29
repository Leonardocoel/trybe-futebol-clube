import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/', LeaderboardController.leaderboard);
router.get('/home', LeaderboardController.leaderboardHome);
router.get('/away', LeaderboardController.leaderboardAway);

export default router;
