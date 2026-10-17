import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Lesson } from '../models/Lesson.js';
import { Phrase } from '../models/Phrase.js';
import { Quiz } from '../models/Quiz.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { Progress } from '../models/Progress.js';

export const getPlatformStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalCategories,
      totalLessons,
      totalPhrases,
      totalQuizzes,
      totalAttempts
    ] = await Promise.all([
      User.countDocuments(),
      Category.countDocuments(),
      Lesson.countDocuments(),
      Phrase.countDocuments(),
      Quiz.countDocuments(),
      QuizAttempt.countDocuments()
    ]);

    const recentAttempts = await QuizAttempt.find()
      .populate('userId', 'name email')
      .populate('quizId', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await User.find()
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalCategories,
          totalLessons,
          totalPhrases,
          totalQuizzes,
          totalAttempts
        },
        recentAttempts,
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

// --- Category Management ---
export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category updated', data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};

// --- Lesson Management ---
export const createLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json({ success: true, message: 'Lesson created', data: lesson });
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
    res.json({ success: true, message: 'Lesson updated', data: lesson });
  } catch (error) {
    next(error);
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
    res.json({ success: true, message: 'Lesson deleted' });
  } catch (error) {
    next(error);
  }
};

// --- Phrase Management ---
export const createPhrase = async (req, res, next) => {
  try {
    const phrase = await Phrase.create(req.body);
    res.status(201).json({ success: true, message: 'Phrase created', data: phrase });
  } catch (error) {
    next(error);
  }
};

export const updatePhrase = async (req, res, next) => {
  try {
    const phrase = await Phrase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!phrase) return res.status(404).json({ success: false, message: 'Phrase not found' });
    res.json({ success: true, message: 'Phrase updated', data: phrase });
  } catch (error) {
    next(error);
  }
};

export const deletePhrase = async (req, res, next) => {
  try {
    const phrase = await Phrase.findByIdAndDelete(req.params.id);
    if (!phrase) return res.status(404).json({ success: false, message: 'Phrase not found' });
    res.json({ success: true, message: 'Phrase deleted' });
  } catch (error) {
    next(error);
  }
};

// --- Quiz Management ---
export const createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, message: 'Quiz created', data: quiz });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
    res.json({ success: true, message: 'Quiz updated', data: quiz });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
    res.json({ success: true, message: 'Quiz deleted' });
  } catch (error) {
    next(error);
  }
};

// --- User Management ---
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User role updated', data: user });
  } catch (error) {
    next(error);
  }
};
