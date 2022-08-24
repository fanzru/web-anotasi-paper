import { axiosInstance } from './axios';

export const isTokenValid = async () => {
  const authToken = localStorage.getItem('token');

  const result = await axiosInstance.get('/api/user/', {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return result.data.status;
};
