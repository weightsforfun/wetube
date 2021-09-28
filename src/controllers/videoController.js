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
  return res.render("404", { pageTitle: "Video not found" });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("edit", { pageTitle: `${video.title}`, video });
  }
  return res.render("404", { pageTitle: "Video not found" });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (video) {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`)),
    });
  }
  return res.render("404", { pageTitle: "Video not found" });
};

export const search = (req, res) => res.send("search video");

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
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error.errorMessage,
    });
  }

  return res.redirect("/");
};
