import { Lesson } from '../models/Lesson.js';
import { Phrase } from '../models/Phrase.js';
import { Quiz } from '../models/Quiz.js';

export const getLessons = async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;
    const filter = { isPublished: true };

    if (category) {
      filter.categoryId = category;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const lessons = await Lesson.find(filter)
      .populate('categoryId', 'title titleKannada slug icon color')
      .sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      data: lessons
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

    const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };
    const lesson = await Lesson.findOne(query).populate('categoryId', 'title titleKannada slug icon color');

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    // Get phrases associated with this lesson or category
    const phrases = await Phrase.find({
      $or: [{ lessonId: lesson._id }, { categoryId: lesson.categoryId._id }]
    }).limit(25);

    // Check if there is an associated quiz
    const quiz = await Quiz.findOne({
      $or: [{ lessonId: lesson._id }, { categoryId: lesson.categoryId._id }],
      isPublished: true
    }).select('-questions.correctAnswerId -questions.explanation');

    res.json({
      success: true,
      data: {
        ...lesson.toObject(),
        phrases,
        quiz: quiz ? { id: quiz._id, title: quiz.title, totalQuestions: quiz.questions?.length || 0 } : null
      }
    });
  } catch (error) {
    next(error);
  }
};
