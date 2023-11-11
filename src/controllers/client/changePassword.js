import User from "../../models/userModel.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  try {
    const userId = req.body.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    const checkPassword = await bcrypt.compare(currentPassword, user.password);
    if (!checkPassword) {
      return res.status(404).json("Wrong password");
    }
    if (newPassword === null) {
      return res.status(400).json("New password can not be null");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    res.status(200).json("Password updated successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
