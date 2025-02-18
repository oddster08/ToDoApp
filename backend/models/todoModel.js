const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'IN_PROGRESS', 'COMPLETE', 'EXPIRED'],
    default: 'ACTIVE'
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Set task to EXPIRED if deadline has passed and task is not COMPLETE
TodoSchema.pre('save', function(next) {
  if (this.status !== 'COMPLETE' && this.deadline < Date.now()) {
    this.status = 'EXPIRED';
  }
  next();
});

module.exports = mongoose.model('Todo', TodoSchema);