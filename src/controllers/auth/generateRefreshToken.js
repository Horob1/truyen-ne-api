import jwt from "jsonwebtoken";

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      user: user.id,
      role: user.role,
    },
    process.env.SECRET_REFRESH_TOKEN,
    {
      expiresIn: "360D",
    }
  );
};
