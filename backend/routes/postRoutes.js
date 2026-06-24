const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Sabhi posts dekhna aur kisi 1 specific post ko dekhna (No login required)
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Naya post, update aur delete karne ke liye login zaruri hai (Protected Routes)
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
