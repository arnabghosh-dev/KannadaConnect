import { apiClient } from './axiosClient.js';

export const registerUser = async (data) => {
  const res = await apiClient.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await apiClient.post('/auth/login', data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await apiClient.post('/auth/logout');
  return res.data;
};

export const fetchMe = async () => {
  const res = await apiClient.get('/auth/me');
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await apiClient.put('/auth/profile', data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await apiClient.put('/auth/password', data);
  return res.data;
};
