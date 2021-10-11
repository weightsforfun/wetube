import "dotenv/config";
import "./db";
import Video from "./model/Video";
import app from "./server";

const PORT = 5000;

const start = () => {
  console.log(`https://localhost:${PORT}`);
};

app.listen(PORT, start);
