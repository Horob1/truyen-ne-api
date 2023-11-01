import User from "../../models/userModel.js";
import bcrypt from "bcrypt";

let refreshTokens = [];

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!username) {
      res.status(404).json("Username Not Found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).json("Wrong Password");
    }
    if (username && validPassword) {
      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);

      refreshTokens.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken, refreshToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
