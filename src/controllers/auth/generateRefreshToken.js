<<<<<<< HEAD
import jwt from 'jsonwebtoken'

const generateRefreshToken = (user) => {
    return jwt.sign({
        user: user.id,
        role: user.role
    }, process.env.SECRET_REFRESH_TOKEN,
    {
        expiresIn: '360D'
    });
}

export default generateRefreshToken;
=======
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
>>>>>>> 146bce480c8f213f5676774933e96f8bb524a136
