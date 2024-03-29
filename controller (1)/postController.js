const postModel = require('../models/postModel')


const homePage = (req,res) =>{
    postModel.find()
    .populate('comments',"_id comment")
    .sort({created_at: -1})
    .then(data =>{
       
        res.render("index",{
            post:data
        })
    })
    .catch(err=> console.log(err))
}
const createNewPostPage = (req,res)=>{
    
    res.render('new-post',{
        
        err: ""
    })
}
const submitNewPost =(req,res) => {
    if(req.body.title === '' || req.body.desc === "") {
        res.render('new-post', {
            err:"fill the blankss"
        })
    }else{
    let newPost = new postModel(req.body)
    newPost.save()
    .then(()=>{
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
    }
}
const openEditPage =(req,res)=>{
    let postId = req.params.id;
postModel.findById(postId)
.then(postInfo =>{
    // here
    res.render('edit-post',{
        info:postInfo,
        err:" error please fill properly"
    })
})
.catch(err => console.log(err))
}
const submitEditPost=(req,res)=>{
    // let postId = req.params.id;
    // postModel.findById(postId)
    //  .then(postInfo =>{
        if(req.body.title === '' || req.body.desc === "") {
            res.render('edit-post', {
               info:"",
               err: " required fill it",
            //    info:postInfo,   
            })
        }else{
            postModel.findByIdAndUpdate(req.params.id,req.body)
            .then(()=>{
                res.redirect('/')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
const deletePost =(req,res) => {
    console.log(req.params.id)
    postModel.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.redirect('/')
    })
    .catch(err => {console.log(err)})
}
const fullPost = (req,res) =>{
    postModel.findById(req.params.id)
     .then(data=> {res.render('full-post',{
         post:data
    })})
    .catch(err=> {console.log(err)})

    //  let postId = req.body;
    // postModel.findById(postId)
    // res.render('full-post', { postModel: data}); 
   
}
module.exports = {
    homePage,
    createNewPostPage,
    submitNewPost,
    deletePost,
    fullPost,
    openEditPage,
    submitEditPost
}