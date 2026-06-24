import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api.js';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Username" 
          required 
          onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
          style={{ padding: '8px' }}
        />
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
        <button type="submit" style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>Register</button>
      </form>
      <p style={{ marginTop: '15px' }}>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
