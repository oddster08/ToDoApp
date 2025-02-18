const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/authRoutes');
const todos = require('./routes/todoRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/todos', todos);

// Basic route
app.get('/', (req, res) => {
  res.send('TODO API is running...');
});

// Export app for Vercel (DO NOT use app.listen)
module.exports = app;
