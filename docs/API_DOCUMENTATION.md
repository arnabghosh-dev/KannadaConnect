# KannadaConnect REST API Documentation

The KannadaConnect backend is built with Node.js and Express using modern ES modules. It provides RESTful endpoints with consistent JSON formatting, centralized error handling, and robust security middleware.

Base URL: `http://localhost:5000/api` (or production deployment URL)

---

## 1. System & Health

### `GET /api/health`
Checks server and database connection health.
- **Auth:** None
- **Response `200 OK`:**
```json
{
  "status": "healthy",
  "timestamp": "2026-10-17T11:36:48.983Z",
  "service": "KannadaConnect API",
  "uptimeSeconds": 120,
  "database": {
    "status": "connected",
    "stateCode": 1
  }
}
```

---

## 2. Authentication (`/api/auth`)

### `POST /api/auth/register`
Creates a new learner account and initializes learner progress in MongoDB.
- **Auth:** None (Rate-limited)
- **Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "Password@123",
  "nativeLanguage": "Hindi",
  "learningGoal": "Everyday Conversations in Bengaluru"
}
```
- **Response `201 Created`:** Sets `kc_token` HttpOnly cookie and returns:
```json
{
  "success": true,
  "message": "Account created successfully. Welcome to KannadaConnect!",
  "token": "eyJhbGciOi...",
  "user": {
    "id": "6ad35888cec52ce5a6bb1d28",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "role": "user",
    "nativeLanguage": "Hindi",
    "learningGoal": "Everyday Conversations in Bengaluru",
    "streak": { "count": 1, "lastActiveDate": "2026-10-17T11:30:00.000Z" }
  }
}
```

### `POST /api/auth/login`
Authenticates a user, updates their daily streak, and returns a session token.
- **Auth:** None (Rate-limited)
- **Body:**
```json
{
  "email": "learner@kannadaconnect.org",
  "password": "Learner@12345"
}
```
- **Response `200 OK`:** Sets `kc_token` HttpOnly cookie and returns safe user JSON.

### `POST /api/auth/logout`
Clears the `kc_token` cookie.
- **Auth:** Optional

### `GET /api/auth/me`
Retrieves current authenticated learner's profile.
- **Auth:** Required (`kc_token` cookie or `Authorization: Bearer <token>`)

### `PUT /api/auth/profile`
Updates user profile information.
- **Auth:** Required
- **Body:** `{ "name": "...", "nativeLanguage": "...", "learningGoal": "..." }`

### `PUT /api/auth/password`
Updates user password with current password verification.
- **Auth:** Required
- **Body:** `{ "currentPassword": "...", "newPassword": "..." }`

---

## 3. Categories & Learning Tracks (`/api/categories`)

### `GET /api/categories`
Returns all active situation tracks ordered by curriculum order, with aggregated lesson and phrase counts.
- **Auth:** None
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "6ad35888cec52ce5a6bb1d2a",
      "slug": "kannada-basics",
      "title": "Kannada Basics",
      "titleKannada": "ಕನ್ನಡ ಮೂಲಗಳು",
      "description": "Master foundational sounds and simple polite affirmations.",
      "icon": "🔤",
      "order": 1,
      "lessonCount": 1,
      "phraseCount": 4
    }
  ]
}
```

### `GET /api/categories/:idOrSlug`
Retrieves category details with its associated lessons and phrases.
- **Auth:** None

---

## 4. Lessons (`/api/lessons`)

### `GET /api/lessons`
Lists published lessons. Supports filters: `?category=<categoryId>&difficulty=<beginner|intermediate|advanced>`.
- **Auth:** None

### `GET /api/lessons/:idOrSlug`
Retrieves detailed lesson content including cultural notes, situational dialogues, key phrases, and associated quiz.
- **Auth:** None

---

## 5. Phrases (`/api/phrases`)

### `GET /api/phrases`
Searchable phrase collection.
- **Auth:** Optional (if authenticated, returns `isFavorite: true/false` per phrase).
- **Query Parameters:**
  - `q`: Search keyword (diacritic-tolerant regex matches Kannada, transliteration, and English)
  - `category`: Category ID filter
  - `difficulty`: `beginner`, `intermediate`, `advanced`
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)

### `GET /api/phrases/random`
Retrieves randomized phrases for flashcard practice sessions.
- **Query Parameters:** `category`, `count` (default: 15)

### `GET /api/phrases/:id`
Retrieves single phrase details with usage context and examples.

---

## 6. Quizzes & Authoritative Scoring (`/api/quizzes`)

### `GET /api/quizzes`
Lists published quizzes with title, category, difficulty, passing score, and question count.
- **Security:** Answer keys and explanations are omitted.

### `GET /api/quizzes/:id`
Retrieves quiz questions and choices for a learner to attempt.
- **Security:** `correctAnswerId` and `explanation` are explicitly stripped server-side to prevent inspection.

### `POST /api/quizzes/:id/attempts`
Authoritatively evaluates learner answers, logs the attempt in MongoDB, updates learner streak, and returns complete review.
- **Auth:** Required
- **Body:**
```json
{
  "answers": [
    { "questionId": "q1", "selectedOptionId": "opt-1" },
    { "questionId": "q2", "selectedOptionId": "opt-2" }
  ]
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "message": "Congratulations! You passed the quiz!",
  "result": {
    "attemptId": "6ad35888cec52ce5a6bb1d4f",
    "score": 5,
    "totalQuestions": 5,
    "percentage": 100,
    "passingScore": 60,
    "passed": true,
    "breakdown": [
      {
        "questionId": "q1",
        "questionText": "What is the English meaning of \"ನಮಸ್ಕಾರ\" (Namaskāra)?",
        "questionKannada": "ನಮಸ್ಕಾರ",
        "selectedOptionId": "opt-1",
        "selectedText": "Hello / Greetings",
        "correctOptionId": "opt-1",
        "correctText": "Hello / Greetings",
        "isCorrect": true,
        "explanation": "\"ನಮಸ್ಕಾರ\" (Namaskāra) is the universal respectful greeting in Kannada."
      }
    ]
  }
}
```

---

## 7. Learning Progress (`/api/progress`)

### `GET /api/progress`
Retrieves authenticated user's metrics: completed lessons, practiced phrases count, current streak, quiz averages, and recommended next lesson.
- **Auth:** Required

### `POST /api/progress/lessons/:lessonId/complete`
Marks a lesson as completed (avoids duplicate records).
- **Auth:** Required

### `POST /api/progress/phrases/:phraseId/practice`
Records practice interaction for a phrase and increments counter.
- **Auth:** Required

### `POST /api/progress/reset`
Resets the learner's progress metrics.
- **Auth:** Required

---

## 8. Favorites (`/api/favorites`)

### `GET /api/favorites`
Lists user's saved phrases populated with category details.
- **Auth:** Required

### `POST /api/favorites/:phraseId`
Saves phrase to user favorites (enforces uniqueness).
- **Auth:** Required

### `DELETE /api/favorites/:phraseId`
Removes phrase from user favorites.
- **Auth:** Required

---

## 9. Administrator RBAC Endpoints (`/api/admin`)
*All administrative endpoints require `role === 'admin'`.*

- `GET /api/admin/stats` — Overall platform metrics (users, tracks, lessons, phrases, quizzes, attempts).
- `POST /api/admin/categories` — Create category track.
- `PUT /api/admin/categories/:id` — Update category.
- `DELETE /api/admin/categories/:id` — Delete category.
- `POST /api/admin/lessons` — Create lesson.
- `PUT /api/admin/lessons/:id` — Update lesson.
- `DELETE /api/admin/lessons/:id` — Delete lesson.
- `POST /api/admin/phrases` — Create phrase.
- `PUT /api/admin/phrases/:id` — Update phrase.
- `DELETE /api/admin/phrases/:id` — Delete phrase.
- `POST /api/admin/quizzes` — Create quiz.
- `PUT /api/admin/quizzes/:id` — Update quiz.
- `DELETE /api/admin/quizzes/:id` — Delete quiz.
- `GET /api/admin/users` — List registered learners.
- `PATCH /api/admin/users/:id/role` — Update user role (`user` / `admin`).
