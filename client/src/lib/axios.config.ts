import axios from 'axios';
import { ENV, getCookie } from './utils';

// Get token from cookies
const token = getCookie('token');

// Setup axios with the API URI
const axiosInstance = axios.create({
  baseURL: ENV.API_URI,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
