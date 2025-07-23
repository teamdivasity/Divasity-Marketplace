import express from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController';
import { checkRole } from '../middlewares/role'; // Middleware to check user role

const router = express.Router();

// General routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Creator-specific routes
router.post('/', checkRole(['user']), createProject);
router.put('/:id', checkRole(['user']), updateProject);
router.delete('/:id', checkRole(['user']), deleteProject);

export default router;