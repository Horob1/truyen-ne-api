import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import novelRouter from './routes/novel.js';
import authorRouter from './routes/author.js';
import categoryRouter from './routes/category.js';
import collectionRouter from './routes/collection.js';
import searchRouter from './routes/search.js';
import forumRouter from './routes/forum.js';
import commentRouter from './routes/comment.js';

const app = express();
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.options(
  '*',
  cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 })
);

app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

//midleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// show status of api in dev env
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/api/novel', novelRouter);
app.use('/api/author', authorRouter);
app.use('/api/category', categoryRouter);
app.use('/api/collection', collectionRouter);
app.use('api/forum', forumRouter);
app.use('api/search', searchRouter);
app.use('api/comment', commentRouter);

export default app;
