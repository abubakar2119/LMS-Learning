import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updateProfilePicture,
  updateUserInfo,
  updateUserPassword,
} from "../controllers/user.controller";
import { isAutheticate } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAutheticate, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAutheticate, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAutheticate, updateUserInfo);
userRouter.put("/update-user-password", isAutheticate, updateUserPassword);
userRouter.put("/update-user-avatar", isAutheticate, updateProfilePicture);

export default userRouter;
