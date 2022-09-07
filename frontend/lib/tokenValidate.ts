import { axiosInstance } from './axios';

export const isTokenValid = async () => {
  try {
    const authToken = localStorage.getItem('token');

    const result = await axiosInstance.get('/api/user/', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return result.data.status;
  } catch (e) {
    return null;
  }
};
