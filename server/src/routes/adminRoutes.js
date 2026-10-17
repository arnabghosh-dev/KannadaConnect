import express from 'express';
import {
  getPlatformStats,
  createCategory,
  updateCategory,
  deleteCategory,
  createLesson,
  updateLesson,
  deleteLesson,
  createPhrase,
  updatePhrase,
  deletePhrase,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getUsers,
  updateUserRole
} from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';
import { validatePhrase } from '../validators/validators.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/stats', getPlatformStats);

// Categories
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Lessons
router.post('/lessons', createLesson);
router.put('/lessons/:id', updateLesson);
router.delete('/lessons/:id', deleteLesson);

// Phrases
router.post('/phrases', validatePhrase, createPhrase);
router.put('/phrases/:id', updatePhrase);
router.delete('/phrases/:id', deletePhrase);

// Quizzes
router.post('/quizzes', createQuiz);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

// Users
router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);

export default router;
