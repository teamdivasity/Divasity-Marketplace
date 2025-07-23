"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const Newsroute_1 = __importDefault(require("./Newsroute"));
const auth_1 = require("../middlewares/auth");
const projectRoutes_1 = __importDefault(require("./projectRoutes"));
const investmentRoutes_1 = __importDefault(require("./investmentRoutes"));
const indexRoutes = express_1.default.Router();
indexRoutes.use("/users", userRoutes_1.default);
indexRoutes.use("/news", Newsroute_1.default);
indexRoutes.use('/projects', auth_1.authenticate, projectRoutes_1.default);
indexRoutes.use('/investments', auth_1.authenticate, investmentRoutes_1.default);
exports.default = indexRoutes;
