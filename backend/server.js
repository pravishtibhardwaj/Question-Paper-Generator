import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";
import questionRoute from "./routes/question.js";
dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(cors());
const port = process.env.PORT || 8080;

app.use("/api/question", questionRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Server. Server is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
