const verifyOTP = (req, res, next) => {
  const { otp, email } = req.body;
  if (req.session.otp === otp && req.session.email === email) {
    next();
  } else {
    return res.status(400).json({
      message: "Mã OTP không hợp lệ.",
    });
  }
};
module.exports = verifyOTP;
