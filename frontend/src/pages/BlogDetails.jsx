import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostDetails, deletePost, addComment, deleteComment } from '../services/api.js';
import { AuthContext } from '../context/AuthContext.jsx';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostData = async () => {
      try {
        const { data } = await fetchPostDetails(id);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPostData();
  }, [id]);

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        alert('Post deleted successfully');
        navigate('/');
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const { data } = await addComment(id, { text: commentText });
      setPost({ ...post, Comments: [...post.Comments, data] });
      setCommentText('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await deleteComment(commentId);
        setPost({
          ...post,
          Comments: post.Comments.filter((c) => c.id !== commentId)
        });
      } catch (err) {
        console.error('Error deleting comment:', err);
      }
    }
  };

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Loading blog details...</h3>;
  if (!post) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Post not found!</h3>;

  return (
    // <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>
    // Purani line: <div style={{ maxWidth: '800px', ... }}>
// Nayi modern clean layout line:
<div className="container">

      <h1>{post.title}</h1>
      <p style={{ color: '#666' }}>By: <b>{post.User?.username}</b> | {new Date(post.createdAt).toLocaleDateString()}</p>
      
      {user && user.id === post.userId && (
        <button onClick={handleDeletePost} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginBottom: '20px' }}>🗑 Delete Post</button>
      )}

      <p style={{ lineHeight: '1.6', fontSize: '1.1rem', whiteSpace: 'pre-wrap', borderBottom: '1px solid #eee', paddingBottom: '30px' }}>{post.content}</p>

      {/* COMMENTS SECTION */}
      <div style={{ marginTop: '30px' }}>
        <h3>Comments ({post.Comments?.length || 0})</h3>
        
        {user ? (
          <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Write a comment..." 
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ flex: 1, padding: '10px' }}
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>Comment</button>
          </form>
        ) : (
          <p style={{ color: '#666' }}>Please login to add a comment.</p>
        )}

        <div>
          {post.Comments && post.Comments.map((comment) => (
            <div key={comment.id} style={{ padding: '10px', background: '#f9f9f9', border: '1px solid #eee', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{comment.User?.username}: </span>
                <span>{comment.text}</span>
              </div>
              {user && user.id === comment.userId && (
                <button onClick={() => handleDeleteComment(comment.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
