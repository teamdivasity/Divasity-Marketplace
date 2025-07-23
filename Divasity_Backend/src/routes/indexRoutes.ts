import express from "express";
import userRoutes from "./userRoutes";
import Newsroute from "./Newsroute"
import { authenticate } from '../middlewares/auth';
import projectRoutes from './projectRoutes';
import investmentRoutes from './investmentRoutes';

const indexRoutes = express.Router();
indexRoutes.use("/users", userRoutes)
indexRoutes.use("/news", Newsroute)
indexRoutes.use('/projects', authenticate, projectRoutes);
indexRoutes.use('/investments', authenticate, investmentRoutes);

export default indexRoutes;