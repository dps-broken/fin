// client/src/services/apiClient.js
import axios from 'axios';

// HARDCODED API URL for Vercel deployment
// Assumes frontend and backend are on the same Vercel domain,
// and Vercel routes /api to the backend serverless function.
const API_BASE_URL = '/api';

// If your backend was on a completely different domain, you'd use:
// const API_BASE_URL = 'https://your-separately-hosted-api.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      if (originalRequest.url !== '/auth/login' && originalRequest.url !== '/auth/register') {
        console.error("API Client: Unauthorized access - 401. Clearing token.");
        localStorage.removeItem('authToken');
        // Force a reload to redirect to login via ProtectedRoute logic
        // Consider a more graceful redirect via React Router if possible
        if (window.location.pathname !== '/login') {
            window.location.href = '/login?sessionExpired=true';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;