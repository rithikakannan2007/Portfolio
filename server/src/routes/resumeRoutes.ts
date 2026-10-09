import { Router } from 'express';
import { resumeController } from '../controllers/resumeController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res, next) => resumeController.getResume(req, res, next));
router.put('/', authenticate, (req, res, next) => resumeController.updateResume(req, res, next));
router.post('/', authenticate, (req, res, next) => resumeController.updateResume(req, res, next));

export default router;
