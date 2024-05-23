import axios from 'axios';
import API_BASE_URL from '../Service/Api';




// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can modify the request config before sending it
    // For example, adding an authorization token
    const token = localStorage.getItem('token'); // Or get the token from a different source
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status code outside the range of 2xx triggers this function
    // You can handle global errors here
    if (error.response && error.response.status === 401) {
      // For example, redirect to login if 401 Unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
