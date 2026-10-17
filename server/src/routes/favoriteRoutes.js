import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getFavorites);
router.post('/:phraseId', addFavorite);
router.delete('/:phraseId', removeFavorite);

export default router;
