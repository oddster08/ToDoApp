const express = require('express');
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getTodos)
  .post(protect, createTodo);

router.route('/:id')
  .get(protect, getTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

module.exports = router;