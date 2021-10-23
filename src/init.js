import "regenerator-runtime";
import "dotenv/config";
import "./db";
import Video from "./model/Video";
import User from "./model/User";
import Comment from "./model/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

const start = () => {
  console.log(`https://localhost:${PORT}`);
};

app.listen(PORT, start);
