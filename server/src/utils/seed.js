import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db.js';
import { config } from '../config/env.js';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Lesson } from '../models/Lesson.js';
import { Phrase } from '../models/Phrase.js';
import { Quiz } from '../models/Quiz.js';
import { Progress } from '../models/Progress.js';
import { Favorite } from '../models/Favorite.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { initialCategories, initialLessons, initialPhrases, initialQuizzes } from './seedData.js';

export const seedDatabase = async () => {
  try {
    console.log('[Seeder] Starting KannadaConnect database seeding...');
    await connectDB();

    // Drop entire database to clear any stale indexes from past runs
    await mongoose.connection.db.dropDatabase();
    console.log('[Seeder] Existing database dropped and cleaned.');

    // 1. Create Default Users
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash(config.adminPassword, salt);
    const learnerPasswordHash = await bcrypt.hash('Learner@12345', salt);

    const adminUser = await User.create({
      name: 'KannadaConnect Administrator',
      email: config.adminEmail.toLowerCase(),
      passwordHash: adminPasswordHash,
      role: 'admin',
      nativeLanguage: 'English',
      learningGoal: 'Curriculum Management & Platform Administration',
      streak: { count: 10, lastActiveDate: new Date() }
    });

    const demoLearner = await User.create({
      name: 'Arnab (Demo Learner)',
      email: 'learner@kannadaconnect.org',
      passwordHash: learnerPasswordHash,
      role: 'user',
      nativeLanguage: 'English',
      learningGoal: 'Everyday Conversations in Bengaluru',
      streak: { count: 3, lastActiveDate: new Date() }
    });

    console.log(`[Seeder] Created Admin: ${adminUser.email}`);
    console.log(`[Seeder] Created Learner: ${demoLearner.email}`);

    // 2. Insert Categories
    const categoryMap = new Map();
    for (const catData of initialCategories) {
      const category = await Category.create(catData);
      categoryMap.set(catData.slug, category);
    }
    console.log(`[Seeder] Created ${categoryMap.size} structured learning categories.`);

    // 3. Insert Lessons
    const lessonMap = new Map();
    for (const lData of initialLessons) {
      const cat = categoryMap.get(lData.categorySlug);
      if (!cat) continue;

      const lesson = await Lesson.create({
        categoryId: cat._id,
        slug: lData.slug,
        title: lData.title,
        titleKannada: lData.titleKannada,
        description: lData.description,
        difficulty: lData.difficulty,
        order: lData.order,
        estimatedMinutes: lData.estimatedMinutes,
        culturalNote: lData.culturalNote,
        dialogue: lData.dialogue,
        isPublished: true
      });
      lessonMap.set(lData.slug, lesson);
    }
    console.log(`[Seeder] Created ${lessonMap.size} structured lessons.`);

    // 4. Insert Phrases
    let phraseCount = 0;
    const insertedPhrases = [];
    for (const pData of initialPhrases) {
      const cat = categoryMap.get(pData.categorySlug);
      const lesson = lessonMap.get(pData.lessonSlug);

      if (!cat) continue;

      const phrase = await Phrase.create({
        kannada: pData.kannada,
        transliteration: pData.transliteration,
        english: pData.english,
        categoryId: cat._id,
        lessonId: lesson ? lesson._id : null,
        difficulty: pData.difficulty,
        tags: pData.tags,
        usageContext: pData.usageContext,
        exampleSentenceKn: pData.exampleSentenceKn,
        exampleSentenceEn: pData.exampleSentenceEn
      });
      insertedPhrases.push(phrase);
      phraseCount++;
    }
    console.log(`[Seeder] Inserted ${phraseCount} authentic Kannada phrases.`);

    // 5. Insert Quizzes
    let quizCount = 0;
    for (const qData of initialQuizzes) {
      const cat = categoryMap.get(qData.categorySlug);
      if (!cat) continue;

      await Quiz.create({
        categoryId: cat._id,
        title: qData.title,
        description: qData.description,
        difficulty: qData.difficulty,
        passingScore: qData.passingScore,
        questions: qData.questions,
        isPublished: true
      });
      quizCount++;
    }
    console.log(`[Seeder] Created ${quizCount} comprehensive quizzes.`);

    // 6. Setup Initial Progress and Favorites for Demo Learner
    if (insertedPhrases.length > 2) {
      await Favorite.create({
        userId: demoLearner._id,
        phraseId: insertedPhrases[0]._id,
        note: 'My favorite daily greeting'
      });
      await Favorite.create({
        userId: demoLearner._id,
        phraseId: insertedPhrases[1]._id,
        note: 'Essential polite word'
      });
    }

    const firstLesson = lessonMap.values().next().value;
    await Progress.create({
      userId: demoLearner._id,
      completedLessons: firstLesson ? [{ lessonId: firstLesson._id, completedAt: new Date() }] : [],
      practicedPhrases: insertedPhrases.slice(0, 4).map((p) => ({
        phraseId: p._id,
        count: 2,
        lastPracticedAt: new Date()
      })),
      currentStreak: 3,
      longestStreak: 5,
      lastActiveDate: new Date()
    });

    console.log('[Seeder] Initial progress & favorites configured for demo learner.');
    console.log('----------------------------------------------------');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('----------------------------------------------------');
    console.log(`Admin credentials:   ${config.adminEmail} / ${config.adminPassword}`);
    console.log(`Learner credentials: learner@kannadaconnect.org / Learner@12345`);
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('[Seeder Error] Failed to seed database:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

// Execute if run directly from CLI
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase();
}
