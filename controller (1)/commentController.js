const commentModel = require('../models/commentModel')
const postModel =require('../models/postModel')

const addComment = (req, res) => {
    if(req.body.comment === '') {
        res.redirect('/')

    } else{
        let newComment = {
            comment: req.body.comment,
            post_id: req.params.id
        }
    
    let comment = new commentModel(newComment);
    
    comment.save()
        .then(() => {
            updatePostDate(req.params.id, comment._id, res) 
        })
        .catch(err => {
            console.log(err)
        })
    }
}

function updatePostDate(postId, commentId, res) {
    postModel.findById(postId)
            .then(post => {
               post.comments.push(commentId)
               post.save()
               .then(()=>{
                res.redirect('/')
               })
               .catch(err => {
                console.log(err)
            })
           
            .catch(err => {
                console.log(err)
            })
})
}

const deleteComment =(req,res) => {
    console.log(req.params.id)
    commentModel.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.redirect('/')
    })
    .catch(err => {console.log(err)})
}
const opencommentEditPage =(req,res)=>{
    let postId = req.params.id;
commentModel.findById(postId)
.then(postInfo =>{
    res.render('edit-comment',{
        info:postInfo,
        err:" error please fill properly"
    })
})
.catch(err => console.log(err))
}
const submiteditedcomment=(req,res)=>{
  
        if(req.body.title === '' || req.body.desc === "") {
            res.render('edit-comment', {
               info:"",
               err: " required fill it",
            //    info:postInfo,   
            })
        }else{
            commentModel.findByIdAndUpdate(req.params.id,req.body)
            .then(()=>{
                res.redirect('/')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
module.exports = {
    addComment,
    deleteComment,
    opencommentEditPage,
    submiteditedcomment,
}