const Comment = require('../models/Comment')

const getAllComments = async (req, res) => {
    const comments = await Comment.find()
    if(!comments) return res.status(204).json({'message': 'no comments found'})
    res.status(200).json({"success": "comments found!", comments})
}

const addComment = async (req, res) => {

    if (!req?.body?.message) return res.status(400).json({ 'message': 'all fields are required.' });
    
    try {
        //create and store the new comment
        const results = await Comment.create({
            message: req.body.message,
            commentator: req.body.commentator
        })
        res.status(201).json(results)
    } catch (err) {
        console.error(err)
    }
}
const deleteComments = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'Error': 'ID parameter required!.' });
    const comment = await Comment.findOne({_id: req.params.id}).exec()
    if (!comment) return res.status(400).json({"Error": `comment ID${req.params.id} not found`})

    const result = await comment.deleteOne({_id: req.params.id})
    res.status(200).json({'Success': 'comments Deleted'})
}

module.exports = { 
    addComment,
    getAllComments,
    deleteComments,
 }