import { Phrase } from '../models/Phrase.js';
import { Favorite } from '../models/Favorite.js';

export const getPhrases = async (req, res, next) => {
  try {
    const { q, category, difficulty, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.categoryId = category;
    }

    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty.toLowerCase();
    }

    if (q && q.trim()) {
      const cleanQ = q.trim();
      // Build a diacritic-tolerant regex pattern so plain letters match accented transliterations
      const pattern = cleanQ
        .replace(/[aAāĀ]/g, '[aāAĀ]')
        .replace(/[iIīĪ]/g, '[iīIĪ]')
        .replace(/[uUūŪ]/g, '[uūUŪ]')
        .replace(/[eEēĒ]/g, '[eēEĒ]')
        .replace(/[oOōŌ]/g, '[oōOŌ]')
        .replace(/[dDḍḌ]/g, '[dḍDḌ]')
        .replace(/[tTṭṬ]/g, '[tṭTṬ]')
        .replace(/[lLḷḶ]/g, '[lḷLḶ]')
        .replace(/[sSṣśSṢŚ]/g, '[sṣśSṢŚ]');

      const searchRegex = new RegExp(pattern, 'i');
      filter.$or = [
        { kannada: new RegExp(cleanQ, 'i') },
        { transliteration: searchRegex },
        { english: new RegExp(cleanQ, 'i') },
        { tags: searchRegex }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [phrases, total] = await Promise.all([
      Phrase.find(filter)
        .populate('categoryId', 'title titleKannada slug icon color')
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limitNum),
      Phrase.countDocuments(filter)
    ]);

    // Check favorites if user is authenticated
    let userFavoriteIds = new Set();
    if (req.user) {
      const favorites = await Favorite.find({ userId: req.user._id }).select('phraseId');
      userFavoriteIds = new Set(favorites.map((f) => f.phraseId.toString()));
    }

    const data = phrases.map((phrase) => ({
      ...phrase.toObject(),
      isFavorite: userFavoriteIds.has(phrase._id.toString())
    }));

    res.json({
      success: true,
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPhraseById = async (req, res, next) => {
  try {
    const phrase = await Phrase.findById(req.params.id).populate('categoryId', 'title titleKannada slug icon color');
    if (!phrase) {
      return res.status(404).json({
        success: false,
        message: 'Phrase not found'
      });
    }

    let isFavorite = false;
    if (req.user) {
      const fav = await Favorite.findOne({ userId: req.user._id, phraseId: phrase._id });
      isFavorite = !!fav;
    }

    res.json({
      success: true,
      data: {
        ...phrase.toObject(),
        isFavorite
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getRandomPhrases = async (req, res, next) => {
  try {
    const count = parseInt(req.query.count, 10) || 15;
    const { category } = req.query;

    const match = {};
    if (category && category !== 'All') {
      match.categoryId = category;
    }

    const phrases = await Phrase.aggregate([
      { $match: match },
      { $sample: { size: count } },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    let userFavoriteIds = new Set();
    if (req.user) {
      const favorites = await Favorite.find({ userId: req.user._id }).select('phraseId');
      userFavoriteIds = new Set(favorites.map((f) => f.phraseId.toString()));
    }

    const formatted = phrases.map((p) => ({
      ...p,
      categoryId: p.category,
      isFavorite: userFavoriteIds.has(p._id.toString())
    }));

    res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};
