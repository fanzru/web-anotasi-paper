import Cookies from 'universal-cookie';
import { axiosInstance } from './axios';

export const isTokenValid = async () => {
  const cookie = new Cookies();
  const authToken = cookie.get('token');

  const result = await axiosInstance.get('/api/user/', {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return result.data.status;
};
