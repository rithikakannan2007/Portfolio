import { Router } from 'express';
import { profileController } from '../controllers/profileController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res, next) => profileController.getProfile(req, res, next));
router.put('/', authenticate, (req, res, next) => profileController.updateProfile(req, res, next));
router.post('/', authenticate, (req, res, next) => profileController.updateProfile(req, res, next));

export default router;
