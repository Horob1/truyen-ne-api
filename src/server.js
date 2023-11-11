import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

// set environment variable
dotenv.config({ path: "./src/config.env" });

// connect database
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
  console.error("Connect fail:", err);
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Listening on port " + PORT + " ❤️");
  }
});
