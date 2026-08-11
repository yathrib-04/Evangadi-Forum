import axios from 'axios';

// The API host must be configurable - a hardcoded localhost URL breaks the
// moment the app is deployed. Set REACT_APP_API_URL at build time (CRA inlines
// it), falling back to the local backend for development.
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosBase = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the bearer token to every request rather than at each call site, so a
// missed header can't silently produce a 401.
axiosBase.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase;
