import express from 'express';
import {
  investInProject,
  getUserInvestments,
  getInvestmentStats,
  updateInvestmentOutcome,
} from '../controllers/investmentController';
import { checkRole } from '../middlewares/role';

const router = express.Router();

// Investor-specific routes
router.post('/', checkRole(['investor']), investInProject);
router.get('/my-investments', checkRole(['investor']), getUserInvestments);
router.get('/stats', checkRole(['investor']), getInvestmentStats);

// Admin-specific routes
router.put('/:investmentId/outcome', checkRole(['admin']), updateInvestmentOutcome);

export default router;