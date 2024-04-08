import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
const CheckPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Not Authen",
      });
    }

    const data = jwt.verify(token, process.env.SECRECT_KEY);
    console.log(data);

    const user = await User.findById(data.id);
    if (!user) {
      return res.status(404).json({
        message: "Not fornd",
      });
    }
    console.log(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  next();
};

export { CheckPermission };
