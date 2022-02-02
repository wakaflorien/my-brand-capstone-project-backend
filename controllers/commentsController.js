const Comment = require('../models/Comment')

const getAllComments = async (req, res) => {
    const comments = await Comment.find()
    if(!comments) return res.status(204).json({"status":"success", "message":"no comments found"})
    res.status(200).json({"status":"success", "message":"all comments", "data":{"comments":comments}})
}

const addComment = async (req, res) => {

    if (!req?.body?.message) return res.status(400).json({ "status":"fail", "error":"All fields are required!" });
    
    try {
        //create and store the new comment
        const results = await Comment.create({
            message: req.body.message,
            commentator: req.body.commentator,
            postId: req.body.postId
        })
        res.status(201).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({"status":"fail", "error":"Internal server error"})
    }
}
const deleteComments = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "status":"fail", "error":"parameter id required" });
    const comment = await Comment.findOne({_id: req.params.id}).exec()
    if (!comment) return res.status(400).json({"status":"fail", "error":`comment ${req.params.id} not found`})

    const result = await comment.deleteOne({_id: req.params.id})
    res.status(200).json({"status":"success", "message":"comment deleted"})
}

module.exports = { 
    addComment,
    getAllComments,
    deleteComments,
 }