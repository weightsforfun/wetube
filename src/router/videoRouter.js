import express from "express";
import {
  home,
  getEdit,
  postEdit,
  see,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", home);
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id", see);
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id/delete").get(deleteVideo);

export default videoRouter;
