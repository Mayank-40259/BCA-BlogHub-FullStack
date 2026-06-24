import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api.js';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content });
      alert('Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '700px' }}>
      <div className="form-container" style={{ maxWidth: '100%', padding: '40px' }}>
        <h2 style={{ textAlign: 'left', marginBottom: '30px' }}>Create a New Blog Post</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              required 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter blog title"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea 
              required 
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Write your blog content here..."
            />
          </div>
          <button type="submit" className="btn-primary">Publish Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
