const express=require('express')
const blog = require('../models/blog')
const router =express.Router()
const Blog=require('../models/blog')


router.get('/', async (req,res)=>{
    try {
        const blogs= await Blog.find()
        res.json(blogs)
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})
//GET BLOGS
router.get('/:id', getBlog,(req,res)=>{
    res.json(res.blog)
})
//GET ONE BLOG
router.post('/', async (req,res)=>{
    const blog=new Blog({
        title: req.body.title,
        content:req.body.content,
        imgThumbnail:req.body.imgThumbnail
    })
    try {
        const newBlog =await blog.save()
        res.status(201).json(newBlog)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//CREATE A BLOG
router.patch('/:id', getBlog, async (req,res)=>{
    
    if(req.body.title!=null){
        res.blog.title=req.body.title
    }
    if(req.body.content!=null){
        res.blog.content=req.body.content
    }
    if(req.body.imgThumbnail!=null){
        res.blog.imgThumbnail=req.body.imgThumbnail
    }
    

    try {
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//UPDATE A BLOG
router.patch('/:id/newComment', getBlog, async (req,res)=>{

    
    const newComment = {
        commentEmail: req.body.commentEmail,
        commentTime: req.body.commentTime,
        commentContent: req.body.commentContent
    }
    console.log(res.blog.comments)
    let currentComments=res.blog.comments;
    currentComments.unshift(newComment);
    
    console.log("New comment "+currentComments)
    res.blog.comments=currentComments;

    try {
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//ADD COMMENT
router.delete('/:id', getBlog, async(req,res)=>{
   try {
       await res.blog.remove()
       res.json({message: 'Deleted Blog'})
   } catch (error) {
       res.status(500).json({message: err.message})
   }
})
//DELETE A BLOG

async function getBlog(req,res,next){
    let blog
    try {
        blog= await Blog.findById(req.params.id)
    
        if(blog==null){
            return res.status(404).json({message: "Cannot find"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.blog=blog
    next()
}



module.exports =router