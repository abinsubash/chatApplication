const nodemailer = require("nodemailer");


const sendOtp= async(email, otp) =>{
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };
    try {
      await transporter.sendMail(mailOption);
      console.log("Otp sented succesfully ");
      return otp;
    } catch (error) {
      console.log("Otp sending error",error);
    }
  }



  module.exports =sendOtp;