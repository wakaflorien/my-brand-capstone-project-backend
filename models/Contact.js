const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactsSchema = new Schema({
    name:  {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    dateCreated: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Contact', contactsSchema)