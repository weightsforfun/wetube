import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, isrequired: true },
  description: { type: String, isrequired: true },
  createdAt: { type: Date, isrequired: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
