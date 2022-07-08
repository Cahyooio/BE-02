const jwt = require("jsonwebtoken");
const { User } = require("../models");

const requireAuth = (req, res, next) => {
  try {
    // const bearerToken = req.headers.authorization;
    // const token = bearerToken.split("Bearer ")[1];
    // const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia");
    // id = tokenPayload.id
    // const curentUser = await User.findOne({
    //   where: { id }
    // })
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      jwt.verify(
        bearerToken,
        process.env.JWT_SIGNATURE_KEY || "Rahasia",
        (err, decodedToken) => {
          if (err) {
            res.status(401).json({
              message: "Unauthorized",
            });
          } else {
            next();
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { requireAuth };
