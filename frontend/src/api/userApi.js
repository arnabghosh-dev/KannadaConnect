import { apiClient } from './axiosClient.js';

export const fetchProgress = async () => {
  const res = await apiClient.get('/progress');
  return res.data;
};

export const markLessonComplete = async (lessonId) => {
  const res = await apiClient.post(`/progress/lessons/${lessonId}/complete`);
  return res.data;
};

export const markPhrasePracticed = async (phraseId) => {
  const res = await apiClient.post(`/progress/phrases/${phraseId}/practice`);
  return res.data;
};

export const resetProgress = async () => {
  const res = await apiClient.post('/progress/reset');
  return res.data;
};

export const fetchFavorites = async () => {
  const res = await apiClient.get('/favorites');
  return res.data;
};

export const addFavorite = async (phraseId) => {
  const res = await apiClient.post(`/favorites/${phraseId}`);
  return res.data;
};

export const removeFavorite = async (phraseId) => {
  const res = await apiClient.delete(`/favorites/${phraseId}`);
  return res.data;
};
