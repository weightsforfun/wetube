import "dotenv/config";
import "./db";
import Video from "./model/Video";
import app from "./server";

const PORT = 4000;

const start = () => {
  console.log(`https://localhost:${PORT}`);
};

app.listen(PORT, start);
