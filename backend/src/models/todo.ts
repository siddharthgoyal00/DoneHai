import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

export const Todo = mongoose.model('Todo', todoSchema);