const jwt = require("jsonwebtoken");
const { User } = require("../models");

const requireAuth = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia");
    id = tokenPayload.id
    req.user = await User.findOne({
      where: { id }
    })
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized"
    })
  }
}

module.exports = { requireAuth }