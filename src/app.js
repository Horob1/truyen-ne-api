import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();

app.use("/auth", authRouter);
app.use("/user", userRouter);
// show status of api in dev env
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

export default app;
