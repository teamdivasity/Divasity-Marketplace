import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import logger from "morgan";
// import cookieParser from "cookie-parser";
import { HttpError } from "http-errors";
import { database } from "./config/database";
import indexRoutes from "./routes/indexRoutes";

const app = express()
dotenv.config()

app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cors())
// app.use(cookieParser())
app.use(logger("dev"))


app.get("/", (req:Request,res:Response) =>{
res.send("Hello Divasity")
})

app.use("/api", indexRoutes);


database.sync({}).then(()=>{
    console.log("Database is Connected Succesfully")
}).catch((err:HttpError) =>{
    console.log(err)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
