import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { registerValidator, loginValidator } from "../validations/auth.js";
import dotenv from "dotenv";
dotenv.config();

class AuthController {
  async register(req, res) {
    try {
      const { username, email, role, password } = req.body;
      const { error } = registerValidator.validate(req.body);
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
      // check email da dc dang ky chua
      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        return res.status(400).json({
          message: "Email da ton tai!",
        });
      }
      // ma hoa password
      const hashPassword = await bcryptjs.hash(password, 10);
      console.log(hashPassword);
      const user = await User.create({
        username,
        email,
        role,
        password: hashPassword,
      });
      res.status(200).json({
        message: "Create thanh cong",
        data: { ...user.toObject(), password: undefined },
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = loginValidator.validate(req.body);
      if (!error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }

      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return res.status(404).json({
          message: "Tai khoan khong chinh xac",
        });
      }

      const checkPassword = await bcryptjs.compare(
        password,
        checkUser.password
      );
      if (!checkPassword) {
        return res.status(404).json({
          message: "Password khong chinh xac.",
        });
      }

      const token = jwt.sign({ id: checkUser._id }, process.env.SECRECT_KEY, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Login thanh cong",
        user: { ...checkUser.toObject(), password: undefined, token },
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
export default AuthController;
