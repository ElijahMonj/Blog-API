require('dotenv').config()
const express=require('express')
const app =express()
const mongoose=require('mongoose')


mongoose.connect("mongodb+srv://admin:"+process.env.password+"@cluster0.3hfbcxb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true,dbName:'Blog-API'})
const db=mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.error("Connected to database"))

app.use(express.json())

const blogsRouter = require('./routes/blogs')
app.use('/blogs',blogsRouter)
app.get('/', (req,res)=>{
    res.send("WTF")
})
const port =process.env.PORT || 5000;
app.listen(port, ()=>console.log("Server Started at port "+port))