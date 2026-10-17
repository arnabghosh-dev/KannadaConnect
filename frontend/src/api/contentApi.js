import { apiClient } from './axiosClient.js';

export const fetchCategories = async () => {
  const res = await apiClient.get('/categories');
  return res.data;
};

export const fetchCategory = async (idOrSlug) => {
  const res = await apiClient.get(`/categories/${idOrSlug}`);
  return res.data;
};

export const fetchLessons = async (params = {}) => {
  const res = await apiClient.get('/lessons', { params });
  return res.data;
};

export const fetchLesson = async (idOrSlug) => {
  const res = await apiClient.get(`/lessons/${idOrSlug}`);
  return res.data;
};

export const fetchPhrases = async (params = {}) => {
  const res = await apiClient.get('/phrases', { params });
  return res.data;
};

export const fetchPhrase = async (id) => {
  const res = await apiClient.get(`/phrases/${id}`);
  return res.data;
};

export const fetchRandomPhrases = async (params = {}) => {
  const res = await apiClient.get('/phrases/random', { params });
  return res.data;
};
