import express from 'express';
import morgan from 'morgan';

const app = express();

// show status of api in dev env
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

export default app;
