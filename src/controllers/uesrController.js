import User from "../model/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });

export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "password confirmation is not matched",
    });
  }
  const exist = await User.exists({ $or: [{ username }, { email }] });
  if (exist) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email is alredy taken",
    });
  }
  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error.errorMessage,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: `there is no account with${username}`,
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .render("login", { pageTitle: "Login", errorMessage: "Wrong password" });
  }
  return res.end();
};

export const edit = (req, res) => res.send("Edit user");

export const remove = (req, res) => res.send("Delte User");

export const logout = (req, res) => res.send("log out");

export const see = (req, res) => res.send("see user!");
