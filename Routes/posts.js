const express = require("express");
const postController = require("../controllers/posts")

const authCheck = require('../middleware/auth')

const router = express.Router();

router.post('',authCheck, postController.createPost)
router.put('/:id',authCheck, postController.editPost)
router.delete('/:id',authCheck, postController.deletePost)
router.get('', postController.getAllPosts)
router.get('/:id', postController.getPost)

module.exports = router
