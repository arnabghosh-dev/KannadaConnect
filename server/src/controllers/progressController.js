import { Progress } from '../models/Progress.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { Favorite } from '../models/Favorite.js';
import { Lesson } from '../models/Lesson.js';
import { Phrase } from '../models/Phrase.js';

export const getProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;

    let progress = await Progress.findOne({ userId })
      .populate('completedLessons.lessonId', 'title titleKannada slug categoryId difficulty')
      .populate('practicedPhrases.phraseId', 'kannada transliteration english categoryId');

    if (!progress) {
      progress = await Progress.create({
        userId,
        completedLessons: [],
        practicedPhrases: [],
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: new Date()
      });
    }

    // Get quiz metrics
    const quizAttempts = await QuizAttempt.find({ userId });
    const totalAttempts = quizAttempts.length;
    const bestScore = totalAttempts > 0 ? Math.max(...quizAttempts.map((a) => a.percentage)) : 0;
    const avgScore =
      totalAttempts > 0
        ? Math.round(quizAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalAttempts)
        : 0;

    // Get favorite count
    const favoriteCount = await Favorite.countDocuments({ userId });

    // Total content counts
    const totalLessonsCount = await Lesson.countDocuments({ isPublished: true });
    const totalPhrasesCount = await Phrase.countDocuments();

    // Recommended next lesson: first uncompleted lesson
    const completedLessonIds = new Set(
      progress.completedLessons.map((cl) => (cl.lessonId?._id || cl.lessonId).toString())
    );
    const nextLesson = await Lesson.findOne({
      _id: { $nin: Array.from(completedLessonIds) },
      isPublished: true
    })
      .populate('categoryId', 'title titleKannada icon')
      .sort({ order: 1 });

    res.json({
      success: true,
      data: {
        completedLessonsCount: progress.completedLessons.length,
        totalLessonsCount,
        practicedPhrasesCount: progress.practicedPhrases.length,
        totalPhrasesCount,
        currentStreak: progress.currentStreak,
        longestStreak: progress.longestStreak,
        lastActiveDate: progress.lastActiveDate,
        quizStats: {
          totalAttempts,
          bestScore,
          avgScore
        },
        favoriteCount,
        completedLessons: progress.completedLessons,
        practicedPhrases: progress.practicedPhrases,
        nextLesson
      }
    });
  } catch (error) {
    next(error);
  }
};

export const completeLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user._id;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = new Progress({ userId, completedLessons: [], practicedPhrases: [] });
    }

    const alreadyCompleted = progress.completedLessons.some(
      (cl) => cl.lessonId.toString() === lessonId.toString()
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push({
        lessonId,
        completedAt: new Date()
      });
      progress.lastActiveDate = new Date();
      await progress.save();
    }

    res.json({
      success: true,
      message: 'Lesson marked as completed!',
      completedCount: progress.completedLessons.length
    });
  } catch (error) {
    next(error);
  }
};

export const practicePhrase = async (req, res, next) => {
  try {
    const { phraseId } = req.params;
    const userId = req.user._id;

    const phrase = await Phrase.findById(phraseId);
    if (!phrase) {
      return res.status(404).json({
        success: false,
        message: 'Phrase not found'
      });
    }

    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = new Progress({ userId, completedLessons: [], practicedPhrases: [] });
    }

    const existingIndex = progress.practicedPhrases.findIndex(
      (pp) => pp.phraseId.toString() === phraseId.toString()
    );

    if (existingIndex >= 0) {
      progress.practicedPhrases[existingIndex].count += 1;
      progress.practicedPhrases[existingIndex].lastPracticedAt = new Date();
    } else {
      progress.practicedPhrases.push({
        phraseId,
        count: 1,
        lastPracticedAt: new Date()
      });
    }

    progress.lastActiveDate = new Date();
    await progress.save();

    res.json({
      success: true,
      message: 'Phrase practice recorded!',
      practicedCount: progress.practicedPhrases.length
    });
  } catch (error) {
    next(error);
  }
};

export const resetProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Progress.findOneAndUpdate(
      { userId },
      {
        $set: {
          completedLessons: [],
          practicedPhrases: [],
          currentStreak: 1,
          lastActiveDate: new Date()
        }
      },
      { upsert: true }
    );

    res.json({
      success: true,
      message: 'Your learning progress has been reset.'
    });
  } catch (error) {
    next(error);
  }
};
