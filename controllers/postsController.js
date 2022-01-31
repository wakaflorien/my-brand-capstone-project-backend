const Post = require('../models/Post')
const fs = require('fs')
const path = require('path')

const getAllPosts = async (req, res) => {
    const posts = await Post.find()
    if (!posts) return res.status(204).json({ "status":"success", "message":"no post found"})
    res.status(200).json({"status":"success", "message":"all posts", "data":{"posts":posts}})
}
const createNewPost = async (req, res) => {
    if(!req?.body?.title || !req?.body?.postBody || !req?.body?.subTitle || !req?.body?.imageUrl ) return res.status(400).json({"status":"fail", "error":"all fields are required"})
    try {
        const result = await Post.create({
            title: req.body.title,
            subTitle: req.body.subTitle,
            postBody: req.body.postBody,
            imageUrl : req.body.imageUrl,
        })
        res.status(201).json({"status":"success", "message": "post created","data":{"post":result}})
        } catch (error) {
            console.error(error)
            res.status(500).json({"status":"fail", "error":"internal server error"})
        }
}
const updatePost = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"status":"fail", "error":"parameter id required"})
    const post = await Post.findOne({_id: req.params.id}).exec()

    if (!post) return res.status(400).json({ "status":"fail", "error":`post ${req.params.id} not found` });

    if (req.body.title) post.title = req.body.title;
    if (req.body.postBody) post.postBody = req.body.postBody; 
    const result = await post.save()
    res.status(200).json({"status":"success","message": "post updated", "data":{"post": result}});
}

const deletePost = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"status":"fail", "error":"parameter id required"})
    const post = await Post.findOne({_id: req.params.id}).exec()

    if (!post) return res.status(400).json({ "status":"fail", "error":`post ${req.params.id} not found` })

    const result = await post.deleteOne({_id: req.params.id})
    res.status(200).json({"status":"success", "message":"post deleted"})
}

const getPost = async (req,res) => {
    if(!req?.params?.id) return res.status(400).json({"status":"fail", "error":"parameter id required"})
    
    const post = await Post.findOne({_id: req.params.id}).exec()

    if (!post) {
        return res.status(400).json({ "status":"fail", "error":`post ${req.params.id} not found` })
    }
    res.status(200).json({"status":"success", "message":"retrieved post", "data":{"post": post}})
}


module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    getPost,
    deletePost,
}