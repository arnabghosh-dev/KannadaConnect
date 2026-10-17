export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('Please enter a valid email address');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  next();
};

export const validatePhrase = (req, res, next) => {
  const { kannada, transliteration, english, categoryId } = req.body;
  const errors = [];

  if (!kannada || typeof kannada !== 'string' || !kannada.trim()) {
    errors.push('Kannada text is required');
  }
  if (!transliteration || typeof transliteration !== 'string' || !transliteration.trim()) {
    errors.push('Transliteration is required');
  }
  if (!english || typeof english !== 'string' || !english.trim()) {
    errors.push('English translation is required');
  }
  if (!categoryId) {
    errors.push('Category ID is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  next();
};

export const validateQuizSubmission = (req, res, next) => {
  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ success: false, message: 'Answers array is required and cannot be empty' });
  }

  for (const a of answers) {
    if (!a.questionId || !a.selectedOptionId) {
      return res.status(400).json({
        success: false,
        message: 'Each answer must include questionId and selectedOptionId'
      });
    }
  }

  next();
};
