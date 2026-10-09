import { Router } from 'express';
import { skillController } from '../controllers/skillController';
import { authenticate } from '../middleware/authMiddleware';
import { validateObjectId } from '../middleware/validation';

const router = Router();

router.get('/', (req, res, next) => skillController.getAllSkills(req, res, next));
router.get('/:id', validateObjectId, (req, res, next) => skillController.getSkillById(req, res, next));
router.post('/', authenticate, (req, res, next) => skillController.createSkill(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => skillController.updateSkill(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => skillController.deleteSkill(req, res, next));

export default router;
