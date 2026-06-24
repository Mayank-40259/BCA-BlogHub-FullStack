import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api.js';
import { AuthContext } from '../context/AuthContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      login(data.user, data.token); // Token & Info global state me save
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          required 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ marginTop: '15px' }}>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
