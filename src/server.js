import express from "express";
import morgan from "morgan";
import globalRouter from "./router/globalrouter";
import userRouter from "./router/userrouter";
import videoRouter from "./router/videoRouter";

const app = express();

const handleHome = (req, res) => {
  return res.send();
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

export default app;
