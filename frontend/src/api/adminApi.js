import { apiClient } from './axiosClient.js';

export const fetchAdminStats = async () => {
  const res = await apiClient.get('/admin/stats');
  return res.data;
};

// Categories
export const createAdminCategory = async (data) => {
  const res = await apiClient.post('/admin/categories', data);
  return res.data;
};

export const updateAdminCategory = async (id, data) => {
  const res = await apiClient.put(`/admin/categories/${id}`, data);
  return res.data;
};

export const deleteAdminCategory = async (id) => {
  const res = await apiClient.delete(`/admin/categories/${id}`);
  return res.data;
};

// Lessons
export const createAdminLesson = async (data) => {
  const res = await apiClient.post('/admin/lessons', data);
  return res.data;
};

export const updateAdminLesson = async (id, data) => {
  const res = await apiClient.put(`/admin/lessons/${id}`, data);
  return res.data;
};

export const deleteAdminLesson = async (id) => {
  const res = await apiClient.delete(`/admin/lessons/${id}`);
  return res.data;
};

// Phrases
export const createAdminPhrase = async (data) => {
  const res = await apiClient.post('/admin/phrases', data);
  return res.data;
};

export const updateAdminPhrase = async (id, data) => {
  const res = await apiClient.put(`/admin/phrases/${id}`, data);
  return res.data;
};

export const deleteAdminPhrase = async (id) => {
  const res = await apiClient.delete(`/admin/phrases/${id}`);
  return res.data;
};

// Quizzes
export const createAdminQuiz = async (data) => {
  const res = await apiClient.post('/admin/quizzes', data);
  return res.data;
};

export const updateAdminQuiz = async (id, data) => {
  const res = await apiClient.put(`/admin/quizzes/${id}`, data);
  return res.data;
};

export const deleteAdminQuiz = async (id) => {
  const res = await apiClient.delete(`/admin/quizzes/${id}`);
  return res.data;
};

// Users
export const fetchAdminUsers = async () => {
  const res = await apiClient.get('/admin/users');
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await apiClient.patch(`/admin/users/${id}/role`, { role });
  return res.data;
};
