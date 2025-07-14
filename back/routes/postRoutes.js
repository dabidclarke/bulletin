const express = require('express');
const router = express.Router();
const { addPost } = require('../controllers/postController');

// POST /posts - Create a new post
router.post('/posts', addPost);

module.exports = router;