import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    textKannada: { type: String, default: '' }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    questionText: { type: String, required: true },
    questionKannada: { type: String, default: '' },
    type: {
      type: String,
      enum: ['multiple_choice', 'translation', 'phrase_completion'],
      default: 'multiple_choice'
    },
    options: [optionSchema],
    correctAnswerId: {
      type: String,
      required: true,
      select: true // we will explicitly exclude when serving questions to learners
    },
    explanation: {
      type: String,
      default: ''
    }
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      index: true,
      default: null
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    passingScore: {
      type: Number,
      default: 70
    },
    questions: [questionSchema],
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Quiz = mongoose.model('Quiz', quizSchema);
