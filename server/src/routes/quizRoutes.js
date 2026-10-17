import express from 'express';
import {
  getQuizzes,
  getQuizById,
  submitQuizAttempt,
  getUserQuizAttempts
} from '../controllers/quizController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validateQuizSubmission } from '../validators/validators.js';

const router = express.Router();

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/:id/attempts', requireAuth, validateQuizSubmission, submitQuizAttempt);
router.get('/:id/attempts', requireAuth, getUserQuizAttempts);
router.get('/user/attempts', requireAuth, getUserQuizAttempts);

export default router;
