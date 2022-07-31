import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://riset.fanzru.dev',
});
