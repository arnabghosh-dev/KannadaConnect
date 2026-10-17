import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach bearer token if stored (as fallback to HttpOnly cookie for cross-origin or testing)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('kc_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized and not on login page, remove stale auth token
    if (error.response?.status === 401) {
      localStorage.removeItem('kc_auth_token');
      localStorage.removeItem('kc_user');
    }
    return Promise.reject(error);
  }
);
