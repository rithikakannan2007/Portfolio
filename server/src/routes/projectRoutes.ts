import { Router } from 'express';
import { projectController } from '../controllers/projectController';
import { validateObjectId, validateProject } from '../middleware/validation';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res, next) => projectController.getAllProjects(req, res, next));
router.get('/:id', validateObjectId, (req, res, next) => projectController.getProjectById(req, res, next));
router.post('/', authenticate, validateProject, (req, res, next) => projectController.createProject(req, res, next));
router.put('/:id', authenticate, validateObjectId, (req, res, next) => projectController.updateProject(req, res, next));
router.delete('/:id', authenticate, validateObjectId, (req, res, next) => projectController.deleteProject(req, res, next));

export default router;
