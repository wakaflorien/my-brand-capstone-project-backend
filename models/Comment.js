const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    message:  {
        type: String,
        required: true
    }, 
    commentator: {
        type: String,
        required: true
    },
    dateCreated: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Comment', commentsSchema)