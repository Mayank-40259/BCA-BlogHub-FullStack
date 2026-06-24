const { Post, User, Comment } = require('../models/index.js');

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      userId: req.user.id // Ye middleware se milega
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// GET ALL POSTS (With Author details)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// GET SINGLE POST (With Author & Comments)
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { 
          model: Comment, 
          include: [{ model: User, attributes: ['username'] }] 
        }
      ]
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post details', error: error.message });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // Check ki kya ye usi user ka post hai
    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
