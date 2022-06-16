const jwt = require("jsonwebtoken");
const { User } = require("../../../models");

const getUser = (req,res,next) => {
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
                res.json(user)
                next()
            }
        })
    }
    else {
        res.locals.user = null
        res.json({ pesan : "ga ada akun"})
        next()
    }
}
module.exports = {getUser}