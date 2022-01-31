const User = require('../models/User')

const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname ) return res.status(400).json({ "status":"fail", "error":"All fields are required" });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email}).exec()

    if (duplicate) return res.status(409).json({"status":"fail", "error":"Conflicting user"}); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //create and store the new user
        const result = await User.create({ 
            "email": email,  
            "password": hashedPwd, 
            "firstname": firstname, 
            "lastname": lastname 
        });
        console.log(result)

        res.status(201).json({ "status":"success", "data":{"User":`${email} created`} });
    } catch (err) {
        res.status(500).json({ "status":"fail", "error":err.message });
    }
}

module.exports = { handleNewUser };