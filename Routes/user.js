const express = require("express");

const userController = require("../controllers/user")

const router = express.Router();

//routes
router.post('/signup', userController.createUser);

router.post('/login', userController.loginUser)


module.exports = router
