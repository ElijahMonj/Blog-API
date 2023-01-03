require('dotenv').config()
const express=require('express')
const app =express()
const mongoose=require('mongoose')
const Blog=require('./models/blog')

mongoose.connect("mongodb+srv://admin:admin@cluster0.3hfbcxb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true,dbName:'Blog-API'})
const db=mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.error("Connected to database"))

app.use(express.json())

const blogsRouter = require('./routes/blogs')
//app.use('/blogs',blogsRouter)
//app.get('/', (req,res)=>{
//    res.send("WTF")
//})

app.get('/', async (req,res)=>{
    try {
        const blogs= await Blog.find()
        res.json(blogs)
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})
const port =process.env.PORT || 3000;
app.listen(port, ()=>console.log("Server Started at port "+port))