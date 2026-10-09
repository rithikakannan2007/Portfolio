import { Router } from 'express';
import { settingsController } from '../controllers/settingsController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res, next) => settingsController.getSettings(req, res, next));
router.put('/', authenticate, (req, res, next) => settingsController.updateSettings(req, res, next));
router.post('/', authenticate, (req, res, next) => settingsController.updateSettings(req, res, next));

export default router;
