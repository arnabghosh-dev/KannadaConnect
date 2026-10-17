import express from 'express';
import { getPhrases, getPhraseById, getRandomPhrases } from '../controllers/phraseController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getPhrases);
router.get('/random', optionalAuth, getRandomPhrases);
router.get('/:id', optionalAuth, getPhraseById);

export default router;
