import express from "express";
import { createNews, getAllNews } from "../controllers/Newscontroller";

const NewsRoutes = express.Router();

NewsRoutes.post("/createNews", ...createNews); // Spread the createNews array
NewsRoutes.get("/getnews", getAllNews)

export default NewsRoutes;