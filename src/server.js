import dotenv from 'dotenv';
import app from './app.js';

// set environment variable
dotenv.config({ path: './config.js' });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Listening on port ' + PORT +' ❤️');
  }
});
 