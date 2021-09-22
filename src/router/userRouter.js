import express from "express";
import { see, edit, remove, logout } from "../controllers/uesrController";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get(":id", see);

export default userRouter;
