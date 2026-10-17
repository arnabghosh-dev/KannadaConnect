import { Category } from '../models/Category.js';
import { Lesson } from '../models/Lesson.js';
import { Phrase } from '../models/Phrase.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1, createdAt: 1 });

    // Aggregate lesson and phrase counts for each category
    const enhanced = await Promise.all(
      categories.map(async (cat) => {
        const lessonCount = await Lesson.countDocuments({ categoryId: cat._id, isPublished: true });
        const phraseCount = await Phrase.countDocuments({ categoryId: cat._id });
        return {
          ...cat.toObject(),
          lessonCount,
          phraseCount
        };
      })
    );

    res.json({
      success: true,
      data: enhanced
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

    const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };
    const category = await Category.findOne(query);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const lessons = await Lesson.find({ categoryId: category._id, isPublished: true }).sort({ order: 1 });
    const phrases = await Phrase.find({ categoryId: category._id }).sort({ createdAt: 1 });

    res.json({
      success: true,
      data: {
        ...category.toObject(),
        lessons,
        phrases
      }
    });
  } catch (error) {
    next(error);
  }
};
