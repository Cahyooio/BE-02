const jwt = require("jsonwebtoken");
const { User } = require("../models");

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt
    //chek keberadaan token
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "Rahasia",(err,decodedToken)=>{
            if (err) {
                console.log(err.message)
                res.redirect('/api/v1/login')
            } else {
                next()
            }
        })
    } 
    else {
        res.redirect('/api/v1/login')
    }
}
//chek curent user
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia", async (err,decodedToken)=>{
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                aidi = decodedToken.id
                let user = await User.findOne({
                    where : aidi
                  })
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}
module.exports = {requireAuth , checkUser}