import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p className="post-meta">
        By: <b>{post.User?.username || 'Anonymous'}</b> | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
      <Link to={`/post/${post.id}`} className="read-more-btn">
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;
