let videos = [
  {
    title: "first video",
    rating: 5,
    comments: 3,
    id: 1,
    views: 5,
    createdAt: "5min ago",
  },
  {
    title: "second video",
    rating: 5,
    comments: 3,
    id: 2,
    views: 1,
    createdAt: "2min ago",
  },
  {
    title: "third video",
    rating: 4,
    comments: 5,
    id: 3,
    views: 6,
    createdAt: "1min ago",
  },
];

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watch:${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const search = (req, res) => res.send("search video");

export const upload = (req, res) => res.send("upload video");

export const remove = (req, res) => {
  res.send(`delete video# ${req.params.id}`);
};
