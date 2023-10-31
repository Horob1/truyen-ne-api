import jwt from "jsonwebtoken";
export const checkJWT = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        res.status(500).json(err);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Token is not valid");
  }
};
