const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment =require('moment/moment')

const postSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type: String,
        required: true
    },
    comments:[
        {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }
    ],
    created_at:{
        type: Date,
        default: Date.now,
        get:function(created_at){
            return moment(created_at).format('DD/MM/YYYY')
        }
    }
},{timestamps:true})


module.exports=mongoose.model("Post",postSchema)