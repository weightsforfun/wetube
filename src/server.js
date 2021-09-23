import "./db";
import Video from "./model/Video";
import express from "express";
import morgan from "morgan";
import globalRouter from "./router/globalrouter";
import userRouter from "./router/userrouter";
import videoRouter from "./router/videoRouter";

const PORT = 4000;

const app = express();

const start = () => {
  console.log("start!");
};
const handleHome = (req, res) => {
  return res.send(
    "<a href=' http://localhost:4000/login'>login</a> <a href='http://localhost:4000/about'>about</a> <a href='http://localhost:4000/contact'>contact</a>"
  );
};

const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.get("/", handleHome);

app.listen(PORT, start);
