const jwt = require("jsonwebtoken");
const { User } = require("../models");

const requireAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split("Bearer ")[1];
  if (bearerToken) {
    jwt.verify(token,process.env.JWT_SIGNATURE_KEY || "Rahasia",(err,decodedToken)=>{
      if(err){
        res.status(500).json({message: err})
      }else {
        next()
      }
    })
  } else {
    res.status(401).json({message: "Unauthorized"})
  }
}

module.exports = { requireAuth }