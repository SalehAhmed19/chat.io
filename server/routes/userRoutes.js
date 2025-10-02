import express from "express";
import {
  checkAuth,
  login,
  signup,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
const userRouter = express.Router();

userRouter.post("/auth/signup", signup);
userRouter.post("/auth/login", login);
userRouter.put("/profile/update", protect, updateProfile);
userRouter.get("/auth/checked", protect, checkAuth);

export default userRouter;
