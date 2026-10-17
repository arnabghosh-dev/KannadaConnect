import mongoose from 'mongoose';

const completedLessonSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const practicedPhraseSchema = new mongoose.Schema(
  {
    phraseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phrase',
      required: true
    },
    count: {
      type: Number,
      default: 1
    },
    lastPracticedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    completedLessons: [completedLessonSchema],
    practicedPhrases: [practicedPhraseSchema],
    currentStreak: {
      type: Number,
      default: 1
    },
    longestStreak: {
      type: Number,
      default: 1
    },
    lastActiveDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const Progress = mongoose.model('Progress', progressSchema);
