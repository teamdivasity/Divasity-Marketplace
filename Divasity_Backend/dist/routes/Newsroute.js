"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Newscontroller_1 = require("../controllers/Newscontroller");
const NewsRoutes = express_1.default.Router();
NewsRoutes.post("/createNews", ...Newscontroller_1.createNews); // Spread the createNews array
NewsRoutes.get("/getnews", Newscontroller_1.getAllNews);
exports.default = NewsRoutes;
