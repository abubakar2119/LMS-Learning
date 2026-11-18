import jwt, { JwtPayload } from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncError"
import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utills/ErrorHandler";
import redis from "../utills/redis";

//Authenticated user
export const isAutheticate=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const access_token=req.cookies.access_token;

    if(!access_token){
        return next(new ErrorHandler("Please login to access this resource",400))
 }

 const decode = jwt.verify(access_token,process.env.ACCESS_TOKEN as string) as JwtPayload

 if(!decode){
    return next(new ErrorHandler("Access token is not valid",400))
 }
  
 const user=await redis.get(decode.id)

 if(!user){
    return next(new ErrorHandler("User not found",400))
 }
 req.user=JSON.parse(user)

 next()
})


//Validate user role 

export const authorizeRole=(...role:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!role.includes(req.user?.role||"")){
            return next(new ErrorHandler(`Role:${req.user?.role} is not allowed to access this role`,403))
        }
        next()
    }
}