const User = require('../models/User') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({"status":"fail", "error":"email and password are required"})
    const foundUser = await User.findOne({ email: email}).exec()
    if(!foundUser) return res.status(404).json({"status":'fail', "error":"User not found"}) 
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles)
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": foundUser._id,
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '3600s' }
        )
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d' }
        )
        
        // saving refreshToken with current user
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ "status":"success",  "data": {"accessToken":accessToken}})
    } else {
        res.status(401).json({"status": "fail", "error": "incorrect credentials"})
    }
}

module.exports = { handleLogin }