const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testSchema = new Schema({
    title:  {
        type: String,
        required: true
    }, 
    postBody: {
        type: String,
        required: true
    },
    dateCreated: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Test', testSchema)