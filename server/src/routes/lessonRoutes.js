import express from 'express';
import { getLessons, getLessonByIdOrSlug } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/', getLessons);
router.get('/:idOrSlug', getLessonByIdOrSlug);

export default router;
