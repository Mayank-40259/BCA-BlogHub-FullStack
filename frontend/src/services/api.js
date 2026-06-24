import axios from 'axios';

// Backend server ka URL
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Har request se pehle localStorage se token check karke header me lagana
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Saare API calls ek hi jagah define kar rahe hain
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

export const fetchPosts = () => API.get('/posts');
export const fetchPostDetails = (id) => API.get(`/posts/${id}`);
export const createPost = (postData) => API.post('/posts', postData);
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const addComment = (postId, commentData) => API.post(`/comments/${postId}`, commentData);
export const deleteComment = (id) => API.delete(`/comments/${id}`);

export default API;
