import { Router } from 'express';
import { achievementController } from '../controllers/achievementController';
import { authenticate } from '../middleware/authMiddleware';
import { validateObjectId } from '../middleware/validation';

const router = Router();

router.get('/', (req, res, next) => achievementController.getAllAchievements(req, res, next));
router.get('/:id', validateObjectId, (req, res, next) => achievementController.getAchievementById(req, res, next));
router.post('/', authenticate, (req, res, next) => achievementController.createAchievement(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => achievementController.updateAchievement(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => achievementController.deleteAchievement(req, res, next));

export default router;
