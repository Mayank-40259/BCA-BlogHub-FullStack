const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Kisi post par comment karne ke liye post ki ID routing me chahiye
router.post('/:postId', authMiddleware, commentController.addComment);

// Comment delete karne ke liye comment ki apni ID chahiye
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
