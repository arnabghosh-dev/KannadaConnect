import { Quiz } from '../models/Quiz.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { Progress } from '../models/Progress.js';

export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({ isPublished: true })
      .populate('categoryId', 'title titleKannada slug icon color')
      .populate('lessonId', 'title slug')
      .select('-questions.correctAnswerId -questions.explanation')
      .sort({ createdAt: 1 });

    const formatted = quizzes.map((quiz) => ({
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      passingScore: quiz.passingScore,
      category: quiz.categoryId,
      lesson: quiz.lessonId,
      questionCount: quiz.questions.length
    }));

    res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('categoryId', 'title titleKannada slug icon color')
      .populate('lessonId', 'title slug');

    if (!quiz || !quiz.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Strip out correctAnswerId and explanation for learner safety
    const sanitizedQuestions = quiz.questions.map((q) => ({
      id: q.id,
      questionText: q.questionText,
      questionKannada: q.questionKannada,
      type: q.type,
      options: q.options
    }));

    res.json({
      success: true,
      data: {
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty,
        passingScore: quiz.passingScore,
        category: quiz.categoryId,
        lesson: quiz.lessonId,
        questions: sanitizedQuestions
      }
    });
  } catch (error) {
    next(error);
  }
};

export const submitQuizAttempt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // array of { questionId, selectedOptionId }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    let correctCount = 0;
    const answerBreakdown = [];

    // Map submitted answers by questionId for fast lookup
    const answerMap = new Map();
    answers.forEach((a) => {
      answerMap.set(a.questionId, a.selectedOptionId);
    });

    for (const q of quiz.questions) {
      const selected = answerMap.get(q.id) || '';
      const isCorrect = selected === q.correctAnswerId;
      if (isCorrect) {
        correctCount++;
      }

      const selectedOpt = q.options.find((o) => o.id === selected);
      const correctOpt = q.options.find((o) => o.id === q.correctAnswerId);

      answerBreakdown.push({
        questionId: q.id,
        questionText: q.questionText,
        questionKannada: q.questionKannada,
        selectedOptionId: selected,
        selectedText: selectedOpt ? selectedOpt.text : 'No answer provided',
        correctOptionId: q.correctAnswerId,
        correctText: correctOpt ? correctOpt.text : '',
        isCorrect,
        explanation: q.explanation || ''
      });
    }

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= (quiz.passingScore || 70);

    // Save attempt in database
    const attempt = await QuizAttempt.create({
      userId: req.user._id,
      quizId: quiz._id,
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      answers: answerBreakdown.map((b) => ({
        questionId: b.questionId,
        selectedOptionId: b.selectedOptionId,
        correctOptionId: b.correctOptionId,
        isCorrect: b.isCorrect,
        explanation: b.explanation
      }))
    });

    // Update user learning activity
    const now = new Date();
    await Progress.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { lastActiveDate: now } },
      { upsert: true }
    );

    res.json({
      success: true,
      message: passed ? 'Congratulations! You passed the quiz!' : 'Quiz completed. Keep practicing to improve!',
      result: {
        attemptId: attempt._id,
        score: correctCount,
        totalQuestions,
        percentage,
        passingScore: quiz.passingScore || 70,
        passed,
        breakdown: answerBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserQuizAttempts = async (req, res, next) => {
  try {
    const filter = { userId: req.user._id };
    if (req.params.id) {
      filter.quizId = req.params.id;
    }

    const attempts = await QuizAttempt.find(filter)
      .populate('quizId', 'title difficulty')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: attempts
    });
  } catch (error) {
    next(error);
  }
};
