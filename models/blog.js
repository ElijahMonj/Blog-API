const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true,
        default: date()
    },
    comments:{
        type:Array,
        default: []
    }

})

function date(){
    var d = new Date();          
    var n = d.toLocaleString([], { hour12: true});
    return n
}
module.exports=mongoose.model('Blog', blogSchema)