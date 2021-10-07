import express from "express";
import {
  see,
  edit,
  logout,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/uesrController";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);

userRouter.get(":id", see);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
