
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { json, urlencoded } from "body-parser";
import logger from "morgan";
import { HttpError } from "http-errors";
import { database } from "./config/database";
import indexRoutes from "./routes/indexRoutes";

// Define Swagger document interface
interface SwaggerDocument {
  openapi: string;
  info: {
    title: string;
    description?: string;
    version: string;
  };
  servers: Array<{
    url: string;
    description?: string;
  }>;
  components?: Record<string, any>;
  paths: Record<string, any>;
  tags?: Array<{ name: string; description?: string }>;
}

const app = express();
dotenv.config();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));

// Load Swagger YAML file
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8')) as SwaggerDocument;

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Divasity");
});

app.use("/api", indexRoutes);

database.sync({}).then(() => {
  console.log("Database is Connected Successfully");
}).catch((err: HttpError) => {
  console.log(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

export default app;
