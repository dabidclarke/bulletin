const express = require('express');
const router = express.Router();
const { addPost } = require('../controllers/postControllers');

// POST /posts - Create a new post
router.post('/', addPost);

module.exports = router;