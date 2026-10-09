import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/stats', authenticate, (req, res, next) => dashboardController.getStats(req, res, next));

export default router;
