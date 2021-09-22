import express from "express";
import {
  trending,
  getEdit,
  postEdit,
  see,
  upload,
  remove,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", trending);
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", remove);

export default videoRouter;
