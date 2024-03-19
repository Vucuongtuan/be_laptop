const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token." });
  }

  jwt.verify(token, process.env.PASS_JWT, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Token không hợp lệ." });
    }
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(403).json({ message: "Token đã hết hạn." });
    }
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  });
};

module.exports = verifyToken;
