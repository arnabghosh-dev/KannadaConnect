import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    nativeLanguage: {
      type: String,
      default: 'English',
      trim: true
    },
    learningGoal: {
      type: String,
      default: 'General Conversation',
      trim: true
    },
    streak: {
      count: { type: Number, default: 0 },
      lastActiveDate: { type: Date, default: null }
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.passwordHash);
};

userSchema.methods.toSafeJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    nativeLanguage: this.nativeLanguage,
    learningGoal: this.learningGoal,
    streak: this.streak,
    createdAt: this.createdAt
  };
};

export const User = mongoose.model('User', userSchema);
