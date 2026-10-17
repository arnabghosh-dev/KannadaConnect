import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { User } from '../src/models/User.js';
import { Quiz } from '../src/models/Quiz.js';

let learnerToken = '';
let adminToken = '';
let sampleQuizId = '';

beforeAll(async () => {
  await connectDB();

  // Login as seeded learner
  const learnerRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'learner@kannadaconnect.org', password: 'Learner@12345' });
  learnerToken = learnerRes.body.token;

  // Login as seeded admin
  const adminRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@kannadaconnect.org', password: 'Admin@12345' });
  adminToken = adminRes.body.token;

  // Get a sample quiz
  const quiz = await Quiz.findOne();
  if (quiz) {
    sampleQuizId = quiz._id.toString();
  }
});

afterAll(async () => {
  await disconnectDB();
});

describe('Health Check API', () => {
  it('GET /api/health returns status healthy and database info', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.database.status).toBe('connected');
  });
});

describe('Authentication API', () => {
  it('POST /api/auth/register creates a new user account with progress', async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Learner',
        email: uniqueEmail,
        password: 'Password@123',
        nativeLanguage: 'Hindi'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(uniqueEmail);
    expect(res.body.token).toBeDefined();

    // Clean up created test user
    await User.deleteOne({ email: uniqueEmail });
  });

  it('POST /api/auth/register rejects duplicate emails', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Duplicate Learner',
        email: 'learner@kannadaconnect.org',
        password: 'Password@123'
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/auth/login fails with invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'learner@kannadaconnect.org', password: 'WrongPassword' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/auth/me returns current user info when authenticated', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${learnerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('learner@kannadaconnect.org');
  });

  it('GET /api/auth/me rejects unauthenticated requests', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});

describe('Content API (Categories, Lessons, Phrases)', () => {
  it('GET /api/categories returns all active categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(10);
    expect(res.body.data[0].titleKannada).toBeDefined();
  });

  it('GET /api/lessons returns lessons with populated category details', async () => {
    const res = await request(app).get('/api/lessons');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].title).toBeDefined();
  });

  it('GET /api/phrases performs keyword search across Kannada and English', async () => {
    const res = await request(app).get('/api/phrases?q=Namaskara');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].kannada).toBe('ನಮಸ್ಕಾರ');
  });
});

describe('Quiz System & Authoritative Scoring API', () => {
  it('GET /api/quizzes/:id does NOT leak correctAnswerId to learners', async () => {
    const res = await request(app).get(`/api/quizzes/${sampleQuizId}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.questions.length).toBeGreaterThan(0);

    // Assert that correctAnswerId is stripped out
    for (const q of res.body.data.questions) {
      expect(q.correctAnswerId).toBeUndefined();
    }
  });

  it('POST /api/quizzes/:id/attempts authoritatively validates answers and calculates score', async () => {
    // Fetch actual quiz questions to submit answers
    const quiz = await Quiz.findById(sampleQuizId);
    expect(quiz).toBeDefined();

    // Create a submission where the first question is correct and the rest are dummy/empty
    const firstQ = quiz.questions[0];
    const answers = [
      { questionId: firstQ.id, selectedOptionId: firstQ.correctAnswerId }
    ];

    const res = await request(app)
      .post(`/api/quizzes/${sampleQuizId}/attempts`)
      .set('Authorization', `Bearer ${learnerToken}`)
      .send({ answers });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.result).toBeDefined();
    expect(res.body.result.score).toBeGreaterThanOrEqual(1);
    expect(res.body.result.breakdown).toBeDefined();
    expect(res.body.result.breakdown[0].isCorrect).toBe(true);
  });
});

describe('Favorites and Progress API', () => {
  it('GET /api/favorites returns learner favorites', async () => {
    const res = await request(app)
      .get('/api/favorites')
      .set('Authorization', `Bearer ${learnerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/progress returns learner progress summary and streak', async () => {
    const res = await request(app)
      .get('/api/progress')
      .set('Authorization', `Bearer ${learnerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.currentStreak).toBeDefined();
    expect(res.body.data.totalLessonsCount).toBeGreaterThan(0);
  });
});

describe('Role-Based Access Control (Admin API)', () => {
  it('GET /api/admin/stats denies access to regular learner (403 Forbidden)', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${learnerToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/admin/stats allows access to administrator (200 OK)', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stats.totalUsers).toBeGreaterThanOrEqual(2);
    expect(res.body.data.stats.totalCategories).toBe(10);
  });
});
