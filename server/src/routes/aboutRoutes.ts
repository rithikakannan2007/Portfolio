import { Router } from 'express';
import { aboutController } from '../controllers/aboutController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res, next) => aboutController.getAbout(req, res, next));
router.put('/', authenticate, (req, res, next) => aboutController.updateAbout(req, res, next));
router.post('/', authenticate, (req, res, next) => aboutController.updateAbout(req, res, next));

export default router;
