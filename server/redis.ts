import {Redis } from "ioredis";
require("dotenv").config();

const ClientRedis=()=>{
    if(process.env.REDIS_URL){
        console.log("Redis is connected successfully");
        return process.env.REDIS_URL
        
    }

    throw new Error("Redis connection failed")
}

export default ClientRedis