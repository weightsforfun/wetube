import express from "express";
import {
  home,
  getEdit,
  postEdit,
  see,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", home);
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id", see);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;
