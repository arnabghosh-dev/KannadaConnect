import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Progress } from '../models/Progress.js';
import { signToken, setAuthCookie, clearAuthCookie } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, nativeLanguage, learningGoal } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      nativeLanguage: nativeLanguage || 'English',
      learningGoal: learningGoal || 'Everyday Conversations',
      streak: { count: 1, lastActiveDate: new Date() }
    });

    // Initialize progress record for this new user
    await Progress.create({
      userId: user._id,
      completedLessons: [],
      practicedPhrases: [],
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date()
    });

    const token = signToken({ id: user._id, role: user.role });
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Welcome to KannadaConnect!',
      token,
      user: user.toSafeJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check & update streak
    const now = new Date();
    const lastActive = user.streak?.lastActiveDate;
    let newStreak = user.streak?.count || 1;

    if (lastActive) {
      const diffHours = (now - new Date(lastActive)) / (1000 * 60 * 60);
      if (diffHours >= 24 && diffHours <= 48) {
        newStreak += 1;
      } else if (diffHours > 48) {
        newStreak = 1;
      }
    }
    user.streak = { count: newStreak, lastActiveDate: now };
    await user.save();

    // Ensure progress document exists
    await Progress.findOneAndUpdate(
      { userId: user._id },
      { $set: { lastActiveDate: now, currentStreak: newStreak } },
      { upsert: true, new: true }
    );

    const token = signToken({ id: user._id, role: user.role });
    setAuthCookie(res, token);

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: user.toSafeJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user.toSafeJSON()
  });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, nativeLanguage, learningGoal } = req.body;
    const user = await User.findById(req.user._id);

    if (name && name.trim().length >= 2) user.name = name.trim();
    if (nativeLanguage) user.nativeLanguage = nativeLanguage.trim();
    if (learningGoal) user.learningGoal = learningGoal.trim();

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toSafeJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};
