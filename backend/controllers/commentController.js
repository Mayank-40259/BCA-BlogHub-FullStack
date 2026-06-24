const { Comment, User } = require('../models/index.js');

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const comment = await Comment.create({
      text,
      postId,
      userId: req.user.id
    });

    // Pura comment object user ke data ke sath return karna frontend par dikhane ke liye
    const fullComment = await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['username'] }]
    });

    res.status(201).json(fullComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};
