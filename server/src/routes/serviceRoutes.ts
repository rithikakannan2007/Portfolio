import { Router } from 'express';
import { serviceController } from '../controllers/serviceController';
import { authenticate } from '../middleware/authMiddleware';
import { validateObjectId } from '../middleware/validation';

const router = Router();

router.get('/', (req, res, next) => serviceController.getAllServices(req, res, next));
router.get('/:id', validateObjectId, (req, res, next) => serviceController.getServiceById(req, res, next));
router.post('/', authenticate, (req, res, next) => serviceController.createService(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => serviceController.updateService(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => serviceController.deleteService(req, res, next));

export default router;
