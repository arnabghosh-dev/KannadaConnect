import { Favorite } from '../models/Favorite.js';
import { Phrase } from '../models/Phrase.js';

export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const favorites = await Favorite.find({ userId })
      .populate({
        path: 'phraseId',
        populate: {
          path: 'categoryId',
          select: 'title titleKannada slug icon color'
        }
      })
      .sort({ createdAt: -1 });

    const phrases = favorites
      .filter((fav) => fav.phraseId !== null)
      .map((fav) => ({
        ...fav.phraseId.toObject(),
        isFavorite: true,
        favoriteId: fav._id,
        savedAt: fav.createdAt
      }));

    res.json({
      success: true,
      data: phrases
    });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
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

    const favorite = await Favorite.findOneAndUpdate(
      { userId, phraseId },
      { $setOnInsert: { userId, phraseId, createdAt: new Date() } },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Phrase added to favorites',
      data: favorite
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { phraseId } = req.params;
    const userId = req.user._id;

    const result = await Favorite.findOneAndDelete({ userId, phraseId });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    res.json({
      success: true,
      message: 'Phrase removed from favorites'
    });
  } catch (error) {
    next(error);
  }
};
