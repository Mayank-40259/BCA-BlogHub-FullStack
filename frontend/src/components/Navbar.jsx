import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '20px 40px', 
      background: '#151d30', 
      borderBottom: '1px solid #232e48',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em', margin: 0 }}>
        <Link to="/" style={{ color: '#818cf8', textDecoration: 'none' }}>BCA BlogHub</Link>
      </h2>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontSize: '0.95rem', fontWeight: '500' }}>
        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
        {user ? (
          <>
            <Link to="/create-post" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: '600' }}>✍ Create Post</Link>
            <span style={{ color: '#64748b' }}>Welcome, <b style={{ color: '#f8fafc' }}>{user.username}</b></span>
            <button onClick={handleLogout} style={{ 
              background: '#ef4444', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ 
              background: '#6366f1', 
              color: 'white', 
              padding: '8px 18px', 
              borderRadius: '8px', 
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
