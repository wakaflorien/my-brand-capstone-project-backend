const Post = require('../models/Post')

const getAllPosts = async (req, res) => {
    const posts = await Post.find()
    if (!posts) return res.status(204).json({ "message": "Post not found!"})
    res.status(200).json({"success": "all articles ",posts})
}
const createNewPost = async (req, res) => {
    if(!req?.body?.title || !req?.body?.postBody ) return res.status(400).json({'message': 'all fields are required'})
    try {
        const result = await Post.create({
            title: req.body.title,
            postBody: req.body.postBody,
            // blogImage : req.file.blogImage
        })
        res.status(201).json({"message": "new article created!",result})
        } catch (error) {
            console.error(error)
            res.status(401).json({"message": "failed!", error})
        }
}
const updatePost = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'ID parameter required'})
    const post = await Post.findOne({_id: req.params.id}).exec()

    if (!post) return res.status(400).json({ "message": `no post matches ID ${req.params.id}` });

    if (req.body.title) post.title = req.body.title;
    if (req.body.postBody) post.postBody = req.body.postBody; 
    const result = await post.save()
    res.status(200).json({"success": "post updated!",result});
}

const deletePost = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'ID parameter required'})
    const post = await Post.findOne({_id: req.params.id}).exec()

    if (!post) return res.status(400).json({ "message": `no post matches ID ${req.params.id}` })

    const result = await post.deleteOne({_id: req.params.id})
    res.status(200).json({'success': 'Deleted Successfully!'})
}

const getPost = async (req,res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'ID parameter required'})
    
    const post = await Post.findOne({_id: req.params.id}).exec()

    if (!post) {
        return res.status(400).json({ "message": `no post matches ID ${req.params.id}` })
    }
    res.status(200).json({"success": "post found!" ,post})
}


module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    getPost,
    deletePost,
}