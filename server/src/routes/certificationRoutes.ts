import { Router } from 'express';
import { certificationController } from '../controllers/certificationController';
import { authenticate } from '../middleware/authMiddleware';
import { validateObjectId } from '../middleware/validation';

const router = Router();

router.get('/', (req, res, next) => certificationController.getAllCertifications(req, res, next));
router.get('/:id', validateObjectId, (req, res, next) => certificationController.getCertificationById(req, res, next));
router.post('/', authenticate, (req, res, next) => certificationController.createCertification(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => certificationController.updateCertification(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => certificationController.deleteCertification(req, res, next));

export default router;
