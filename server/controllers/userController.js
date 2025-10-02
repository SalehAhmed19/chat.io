import { generateJWT } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// user signup function
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing details" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User exist" });
    }

    const salt = bcrypt.genSaltSync(process.env.SALT);
    const hashed = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashed,
      bio,
    });

    const token = generateJWT(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// user login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    const verifyPassword = bcrypt.compareSync(password, userData.password);

    if (!verifyPassword) {
      res.json({ success: false, message: "Invalid credentials" });
    }
    const token = generateJWT(userData._id);

    res.json({
      success: true,
      userData,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

