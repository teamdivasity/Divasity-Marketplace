"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const role_1 = require("../middlewares/role"); // Middleware to check user role
const router = express_1.default.Router();
// General routes
router.get('/', projectController_1.getAllProjects);
router.get('/:id', projectController_1.getProjectById);
// Creator-specific routes
router.post('/', (0, role_1.checkRole)(['user']), projectController_1.createProject);
router.put('/:id', (0, role_1.checkRole)(['user']), projectController_1.updateProject);
router.delete('/:id', (0, role_1.checkRole)(['user']), projectController_1.deleteProject);
exports.default = router;
