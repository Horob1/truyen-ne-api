import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';

const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

//midleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
// show status of api in dev env
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

export default app;
