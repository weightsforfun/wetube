import Video from "../model/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const see = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("watch", { pageTitle: video.title, video });
  }
  return res.status(404).render("404", { pageTitle: "Video not found" });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("edit", { pageTitle: `${video.title}`, video });
  }
  return res.status(404).render("404", { pageTitle: "Video not found" });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (video) {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
  }
  return res.render("404", { pageTitle: "Video not found" });
};

export const remove = (req, res) => {
  res.send(`delete video`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  try {
    const { title, description, hashtags } = req.body;
    Video.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    });
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
