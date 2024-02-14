import jwt from 'jsonwebtoken';
import { generateAccessToken } from './generateAccessToken.js';

export const requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log('🚀 ~ requestRefreshToken ~ refreshToken:', refreshToken);

  if (!refreshToken) return res.status(401).json("You're not authenticated");

  try {
    jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid');
      }
      const newAccessToken = generateAccessToken(user);
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
