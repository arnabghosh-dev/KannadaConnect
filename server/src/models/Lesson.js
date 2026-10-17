import mongoose from 'mongoose';

const dialogueItemSchema = new mongoose.Schema(
  {
    speaker: { type: String, required: true },
    kannada: { type: String, required: true },
    transliteration: { type: String, required: true },
    english: { type: String, required: true }
  },
  { _id: false }
);

const lessonSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
      index: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true
    },
    titleKannada: {
      type: String,
      required: [true, 'Kannada title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Lesson description is required'],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    order: {
      type: Number,
      default: 0
    },
    estimatedMinutes: {
      type: Number,
      default: 5
    },
    culturalNote: {
      type: String,
      default: ''
    },
    dialogue: [dialogueItemSchema],
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Lesson = mongoose.model('Lesson', lessonSchema);
