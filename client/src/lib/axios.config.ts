import axios from 'axios';
import { ENV, getCookie } from './utils';

const token = getCookie('token');

const axiosInstance = axios.create({
  baseURL: ENV.API_URI,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
