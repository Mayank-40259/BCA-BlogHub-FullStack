import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/api.js';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Loading blogs...</h3>;

  return (
    // <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>
    // Purani line: <div style={{ maxWidth: '800px', ... }}>
// Nayi modern clean layout line:
<div className="container">

      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Latest Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available. Be the first to write one!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '20px' }}>
            <h2>{post.title}</h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>By: <b>{post.User?.username}</b> | {new Date(post.createdAt).toLocaleDateString()}</p>
            <p>{post.content.substring(0, 150)}...</p>
            <Link to={`/post/${post.id}`} style={{ display: 'inline-block', color: 'blue', textDecoration: 'none', fontWeight: 'bold' }}>Read More →</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
