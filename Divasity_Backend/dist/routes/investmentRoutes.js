"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const investmentController_1 = require("../controllers/investmentController");
const role_1 = require("../middlewares/role");
const router = express_1.default.Router();
// Investor-specific routes
router.post('/', (0, role_1.checkRole)(['investor']), investmentController_1.investInProject);
router.get('/my-investments', (0, role_1.checkRole)(['investor']), investmentController_1.getUserInvestments);
router.get('/stats', (0, role_1.checkRole)(['investor']), investmentController_1.getInvestmentStats);
// Admin-specific routes
router.put('/:investmentId/outcome', (0, role_1.checkRole)(['admin']), investmentController_1.updateInvestmentOutcome);
exports.default = router;
