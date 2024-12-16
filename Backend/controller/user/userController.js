const User = require("../../models/userModel");
const Otp = require("../../models/otpModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Todo = require("../../models/todoModel");
const sendOtp = require("../../utils/otpSetup")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const jwttoken = require('../../utils/jwtToken')
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
exports.signup = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log(JWT_SECRET)
    const { name, userName, email, password ,domain} = req.body;

    const userName_Exist = await User.findOne({ userName });
    const email_Exist = await User.findOne({ email });
    if (userName_Exist) {
      return res.json({
        success: false,
        message: "Username already exists. Please enter another username.",
      });
    }
    if (email_Exist) {
      return res.json({ success: false, message: "Email already exists." });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const temp_user = { name, userName, email, password: hashed_password ,domain};

    const otp = Math.floor(1000 + Math.random() * 9000);
    sendOtp(email, otp);

    const otpUser = new Otp({ email, otp });
    await otpUser.save();

    if (!otp) {
      return res.json({ success: false, message: "Something went wrong." });
    }

    const token = jwt.sign(temp_user, JWT_SECRET, { expiresIn: '15m' }); 
   const decoded = jwt.decode(token)
   console.log("this is decodede",decoded)
    res.json({
      success: true,
      message: "Signup data received successfully! OTP sent....",
      token, 
    });
  } catch (error) {
    console.log("Signup validation error", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


exports.otpVerification = async (req, res) => {
  try {
    const { otp, tempUser } = req.body;
    const decoded = jwt.verify(tempUser, JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const { email, name, userName, password,domain } = decoded;

    const otpRecord = await Otp.findOne({ email });
    console.log(otpRecord)
    console.log(otpRecord.email,otpRecord.otp)
    if (!otpRecord) {
      return res.json({ success: false, message: "User not found or OTP expired." });
    }
    if (Number(otp) !== otpRecord.otp) {
      return res.json({ success: false, message: "Incorrect OTP. Please try again." });
    }

    const newUser = new User({ name, userName, email, password ,domain});
    await newUser.save();
    console.log("New user saved:", newUser);

    const newTodo = new Todo({ userId: newUser._id });
    await newTodo.save();
    console.log("Todo created for user:", newTodo);

    await Otp.deleteOne({ email });

    return res.json({ success: true, message: "Signup successful!" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


exports.loginValidation = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    let user;

    if (username) {
      user = await User.findOne({ userName: username });
      if (!user) {
        return res.json({ success: false, message: "Username is wrong" });
      }
    } else if (email) {
      user = await User.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "Email is wrong" });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password); 
    if (isMatch) {
      console.log(user._id)
      let token = jwttoken(user._id)
      console.log("This is the token",token)
      return res.json({ success: true ,token});
    } else {
      return res.json({ success: false, message: "Password is wrong" });
    }
  } catch (error) {
    console.error("Error during login validation:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
