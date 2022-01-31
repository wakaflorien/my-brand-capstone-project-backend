const User = require('../models/User')

const handleLogout =  async (req, res) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204).json({"status":"success", "message":"successfully logged out"})

    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ refreshToken }).exec()

    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true})
        return res.status(204).json({"status":"success", "message": "successfully logged out"})
    }
   
    //delete refresh token
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    
    res.clearCookie('jwt', { httpOnly: true})
    res.status(204).json({"status":"success", "message":"successfully logged out"})   
     
}

module.exports = { handleLogout }