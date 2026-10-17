import { apiClient } from './axiosClient.js';

export const fetchQuizzes = async () => {
  const res = await apiClient.get('/quizzes');
  return res.data;
};

export const fetchQuiz = async (id) => {
  const res = await apiClient.get(`/quizzes/${id}`);
  return res.data;
};

export const submitQuizAttempt = async (id, answers) => {
  const res = await apiClient.post(`/quizzes/${id}/attempts`, { answers });
  return res.data;
};

export const fetchUserAttempts = async (quizId) => {
  const url = quizId ? `/quizzes/${quizId}/attempts` : '/quizzes/user/attempts';
  const res = await apiClient.get(url);
  return res.data;
};
