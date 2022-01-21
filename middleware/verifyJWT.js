const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization 
    // const authHeader = req.headers["authorization"]
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({'message': 'Unauthorized access detected!'}) //.startsWith('Bearer ')
    
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({"error":"Forbidden!"})
            
            req.user = decoded.UserInfo.email
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}
module.exports = verifyJWT