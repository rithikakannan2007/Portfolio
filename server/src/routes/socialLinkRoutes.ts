import { Router } from 'express';
import { socialLinkController } from '../controllers/socialLinkController';
import { authenticate } from '../middleware/authMiddleware';
import { validateObjectId } from '../middleware/validation';

const router = Router();

router.get('/', (req, res, next) => socialLinkController.getAllSocialLinks(req, res, next));
router.post('/', authenticate, (req, res, next) => socialLinkController.createSocialLink(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => socialLinkController.updateSocialLink(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => socialLinkController.deleteSocialLink(req, res, next));

export default router;
