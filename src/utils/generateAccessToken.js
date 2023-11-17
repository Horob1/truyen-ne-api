import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.SECRET_ACCESS_TOKEN,
    {
      expiresIn: '1D',
    },
  );
};
