const User = require('../models/User')
const bcrypt = require('bcrypt')

const handleUpdateUser = async (req, res) => {
    
    if(!req.user) return res.status(400).json({'message': 'no logged in user'})
    const user = await User.findOne({email: req.user}).exec()

    if (!user) return res.status(400).json({ "message": `no user match found` });

    //encrypt the password
    const hashedPwd = await bcrypt.hash(req.body.password, 10);

    if (req.user) user.email = req.user;
    if (req.body.password) user.password = hashedPwd;
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    const result = await user.save()
    res.status(200).json({"success": "user profile updated!",result});
}

module.exports = { handleUpdateUser };