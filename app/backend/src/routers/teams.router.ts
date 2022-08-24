import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const router = Router();

router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getTeamById);

export default router;
