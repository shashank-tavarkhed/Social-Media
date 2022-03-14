const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {type: String , required: true},
    content: { type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref:"user", required:true}
})

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;
