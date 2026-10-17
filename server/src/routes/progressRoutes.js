import express from 'express';
import {
  getProgress,
  completeLesson,
  practicePhrase,
  resetProgress
} from '../controllers/progressController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getProgress);
router.post('/lessons/:lessonId/complete', completeLesson);
router.post('/phrases/:phraseId/practice', practicePhrase);
router.post('/reset', resetProgress);

export default router;
