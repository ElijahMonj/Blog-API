require('dotenv').config()
const express=require('express')
const app =express()
const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true,dbName:'Blog-API'})
const db=mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.error("Connected to database"))

app.use(express.json())

const blogsRouter = require('./routes/blogs')
app.use('/blogs',blogsRouter)

const port =process.env.PORT || 3000;
app.listen(port, ()=>console.log("Server Started"))