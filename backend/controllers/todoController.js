const Todo = require('../models/todoModel');

// @desc    Get all todos for a user
// @route   GET /api/todos
// @access  Private
exports.getTodos = async (req, res, next) => {
  try {
    // Build query
    let query = Todo.find({ user: req.user.id });

    // Filtering
    if (req.query.status) {
      query = query.find({ status: req.query.status });
    }

    // Search by title or description
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = query.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex }
        ]
      });
    }

    // Sorting
    if (req.query.sort === 'deadline') {
      query = query.sort('deadline');
    } else if (req.query.sort === 'status') {
      query = query.sort('status');
    } else {
      query = query.sort('-createdAt');
    }

    const todos = await query;

    // Update any expired todos
    todos.forEach(async (todo) => {
      if (todo.status !== 'COMPLETE' && todo.deadline < Date.now()) {
        todo.status = 'EXPIRED';
        await todo.save();
      }
    });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to view this todo'
      });
    }

    // Check if todo is expired
    if (todo.status !== 'COMPLETE' && todo.deadline < Date.now()) {
      todo.status = 'EXPIRED';
      await todo.save();
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = async (req, res, next) => {
  try {
    // Add user to request body
    req.body.user = req.user.id;

    const todo = await Todo.create(req.body);

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
exports.updateTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this todo'
      });
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this todo'
      });
    }

    await Todo.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};