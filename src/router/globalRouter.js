import express from "express";
import { join, login } from "../controllers/uesrController";
import { see, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", see);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("search", search);

export default globalRouter;
