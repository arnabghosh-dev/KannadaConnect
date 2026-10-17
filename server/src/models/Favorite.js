import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    phraseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phrase',
      required: true,
      index: true
    },
    note: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

favoriteSchema.index({ userId: 1, phraseId: 1 }, { unique: true });

export const Favorite = mongoose.model('Favorite', favoriteSchema);
