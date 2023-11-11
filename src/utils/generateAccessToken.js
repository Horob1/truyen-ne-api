<<<<<<< HEAD
import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
    return jwt.sign({
        user: user.id,
        role: user.role
    }, process.env.SECRET_ACCESS_TOKEN,
    {
        expiresIn: '1D'
    });
}

export default generateAccessToken;
=======
import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      role: user.role,
    },
    process.env.SECRET_ACCESS_TOKEN,
    {
      expiresIn: "1D",
    }
  );
};
>>>>>>> 146bce480c8f213f5676774933e96f8bb524a136
