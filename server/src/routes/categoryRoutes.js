import express from 'express';
import { getCategories, getCategoryByIdOrSlug } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:idOrSlug', getCategoryByIdOrSlug);

export default router;
