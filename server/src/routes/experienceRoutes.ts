import { Router } from 'express';
import { experienceController } from '../controllers/experienceController';
import { authenticate } from '../middleware/authMiddleware';
import { validateObjectId } from '../middleware/validation';

const router = Router();

router.get('/', (req, res, next) => experienceController.getAllExperience(req, res, next));
router.get('/:id', validateObjectId, (req, res, next) => experienceController.getExperienceById(req, res, next));
router.post('/', authenticate, (req, res, next) => experienceController.createExperience(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => experienceController.updateExperience(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => experienceController.deleteExperience(req, res, next));

export default router;
