import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, isrequired: true },
  fileUrl: { type: String, required: true },
  description: { type: String, isrequired: true },
  createdAt: { type: Date, isrequired: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
