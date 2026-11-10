require( "dotenv").config()
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import {ErrorMiddleware} from "./middleware/error"; 

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

//routes

app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});


//random error

app.all("/{*splat}",(req,res,next)=>{
    const err=new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode=400;
    next(err)
})

app.use(ErrorMiddleware)