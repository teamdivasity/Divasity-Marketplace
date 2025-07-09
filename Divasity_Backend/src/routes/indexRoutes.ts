import express from "express";
import userRoutes from "./userRoutes";
import Newsroute from "./Newsroute"

const indexRoutes = express.Router();
indexRoutes.use("/users", userRoutes)
indexRoutes.use("/news", Newsroute)

export default indexRoutes;