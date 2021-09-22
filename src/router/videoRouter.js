import express from "express";
import {
  trending,
  getEdit,
  postEdit,
  see,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", trending);
videoRouter.get("/:id(\\d+)", see);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
