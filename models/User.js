const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
   email: {
       type: String,
       required: true
   },
   roles: {
       User: {
        type: Number, 
        default: 1998
       },
       Admin: {
        type: Number, 
        default: 5150
       }
   },
   password: {
    type: String, 
    required: true
   },
   firstname: {
    type: String, 
    required: true
   },
   lastname: {
    type: String, 
    required: true
   },
   refreshToken: String
})

module.exports = mongoose.model('User', userSchema)