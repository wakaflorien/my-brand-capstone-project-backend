const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken =  async (req, res) => {
    // const cookies = req.cookies;
    // console.log(req.user)
    const email = req.user
    if(!email) return res.status(401).json({"status":"fail", "error":"Unauthorized"})
    // if(!cookies?.jwt) return res.status(401).json({"status":"fail", "error":"Unauthorized"})
    // const refreshToken = cookies.jwt

    // const foundUser = await User.findOne({ refreshToken }).exec()
    const foundUser = await User.findOne({ email }).exec()
    const refreshToken = foundUser.refreshToken
    console.log(refreshToken)

    if(!foundUser) return res.status(403).json({"status":"fail", "error":"Forbidden"}) 
   
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email) res.status(403).json({"status":"fail", "error":"Forbidden"}) 
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '3600s'}
            )
            res.status(200).json({"status":"success", "data":{"accessToken":accessToken}})
        }
    )
}

module.exports = { handleRefreshToken }