const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken =  async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ refreshToken }).exec()

    if(!foundUser) return res.status(403).json({'message': 'Forbidden'}) //Forbidden
   
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403) 
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
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }