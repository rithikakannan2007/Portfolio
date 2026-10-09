import { Router } from 'express';
import { educationController } from '../controllers/educationController';
import { authenticate } from '../middleware/authMiddleware';
import { validateObjectId } from '../middleware/validation';

const router = Router();

router.get('/', (req, res, next) => educationController.getAllEducation(req, res, next));
router.get('/:id', validateObjectId, (req, res, next) => educationController.getEducationById(req, res, next));
router.post('/', authenticate, (req, res, next) => educationController.createEducation(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => educationController.updateEducation(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => educationController.deleteEducation(req, res, next));

export default router;
