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
import { protectorMiddleware, uploadFiles, uploadVideo } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/", home);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", see);
videoRouter
  .route("/:id/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter.route("/:id/delete").all(protectorMiddleware).get(deleteVideo);

export default videoRouter;
