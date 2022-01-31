const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsSchema = new Schema({
    title:  {
        type: String,
        required: true
    }, 
    subTitle:  {
        type: String,
        required: true
    },  
    postBody: {
        type: String,
        required: true
    }, 
    imageUrl: {
        type: String,
        required: true
    },
    dateCreated: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', postsSchema)