import Video from "../model/Video";
import User from "../model/User";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const see = async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id).populate("owner");
  if (video) {
    return res.render("watch", { pageTitle: video.title, video });
  }
  return res.status(404).render("404", { pageTitle: "Video not found" });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(_id) !== String(video.owner)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  if (String(_id) !== String(video.owner)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
};

export const remove = (req, res) => {
  res.send(`delete video`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const { file } = req;
  const {
    user: { _id },
  } = req.session;
  try {
    const newVideo = await Video.create({
      fileUrl: file.path,
      title,
      description,
      owner: _id,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error.errorMessage,
    });
  }

  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    req.flash("error", "you are not owner of video");
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(_id) !== String(video.owner)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  } else {
    video.meta.views = video.meta.views + 1;
    await video.save();
    res.sendStatus(200);
  }
};
