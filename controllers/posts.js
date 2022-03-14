const postModel = require('../Models/post');


exports.createPost = async(req,res)=>{
  const post = new postModel({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userID,
  })
  const createdPost = await post.save();
  if(createdPost){
    res.status(200).json({
        message: 'Post added!',
        postID: createdPost.id,
      })
  }else{
    res.status(500).json({
      message: 'Post Creation Failed!',
    })
  }
}


exports.editPost = async(req,res)=>{
  const post = new postModel({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userID,
  })

  const result = await postModel.updateOne({_id: req.params.id , creator: req.userData.userID,}, post);

  if(result.modifiedCount>0 && result.matchedCount>0){
    res.status(200).json({
      message: 'UPDATED!(server)',
    })
  }else if(result.modifiedCount==0 && result.matchedCount>0){
    res.status(500).json({
      message: 'Content is not modified!.',
    })
  }else{
    res.status(500).json({
      message: 'Not authorized to edit post!',
    })
  }
}


exports.deletePost = async(req,res)=>{
  const result = await postModel.deleteOne({_id: req.params.id, creator: req.userData.userID});
  const maxPosts = await postModel.count();
  // if( req.userData.userID == req.params.id)
  if(result.deletedCount>0){
  res.status(200).json({
    message: 'DELETED!(server)',
    maxPosts: maxPosts
    })
  }else{
    res.status(500).json({
      message: 'Not Authorized to delete post!',
      })
  }
}


exports.getAllPosts = async(req,res)=>{
  const pageSize = req.query.pagesize*1;
  const currentPage = req.query.currentpage*1;
  const pageQuery = postModel.find({});
  const maxPosts =await postModel.count();
  if( pageSize && currentPage){
    pageQuery.skip( pageSize * (currentPage-1)).limit(pageSize);
  }

  const data = await pageQuery;
  if(data){
    res.status(200).json({
        message: 'Success',
        maxPosts : maxPosts,
        data: data,
      })
  }else{
    res.status(500).json({
      message: 'Fetching posts failed!',
    })
  }

}


exports.getPost = async(req,res)=>{
  const data = await postModel.find({_id: req.params.id});
  if(data){
    res.status(200).json({
        message: 'Success',
        data: data,
      })
  }else{
    res.status(500).json({
      message: 'Fetching post failed!',
    })
  }

}
