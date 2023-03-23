const express = require("express");
const { createUser, getUsers, signIn, getUser,blockUser, blockUsers } = require("../controllers/userControllers");

const router = express.Router();

router.post('/signup',createUser);
router.post('/login',signIn);
router.get('/get-users',getUsers);
router.get('/get-user',getUser);
router.post('/block-user',blockUser);
router.post('/block-users',blockUsers);

module.exports = router;