import { Router } from 'express';
import { messageController } from '../controllers/messageController';
import { validateObjectId, validateMessage } from '../middleware/validation';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, (req, res, next) => messageController.getAllMessages(req, res, next));
router.get('/:id', authenticate, validateObjectId, (req, res, next) => messageController.getMessageById(req, res, next));
router.post('/', validateMessage, (req, res, next) => messageController.createMessage(req, res, next));
router.put('/:id/read', authenticate, validateObjectId, (req, res, next) => messageController.markAsRead(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => messageController.deleteMessage(req, res, next));

export default router;
