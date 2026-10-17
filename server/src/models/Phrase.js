import mongoose from 'mongoose';

const phraseSchema = new mongoose.Schema(
  {
    kannada: {
      type: String,
      required: [true, 'Kannada script is required'],
      trim: true
    },
    transliteration: {
      type: String,
      required: [true, 'Transliteration is required'],
      trim: true
    },
    english: {
      type: String,
      required: [true, 'English translation is required'],
      trim: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
      index: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      index: true,
      default: null
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
      index: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    usageContext: {
      type: String,
      default: ''
    },
    exampleSentenceKn: {
      type: String,
      default: ''
    },
    exampleSentenceEn: {
      type: String,
      default: ''
    },
    audioUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

phraseSchema.index({ kannada: 'text', transliteration: 'text', english: 'text' });

export const Phrase = mongoose.model('Phrase', phraseSchema);
