import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";


const app = express();

//midleware
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
app.use(bodyParser.json())

app.use("/auth", authRouter);
app.use("/user", userRouter);
// show status of api in dev env
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

export default app;
