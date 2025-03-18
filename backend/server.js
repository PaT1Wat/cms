const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
// Auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// User routes
app.get('/api/users', authenticate, getAllUsers);
app.put('/api/users/role', authenticate, updateUserRole);

// Content routes
app.post('/api/content', authenticate, createContent);
app.put('/api/content/:id', authenticate, updateContent);
app.delete('/api/content/:id', authenticate, deleteContent);
app.get('/api/content', (req, res) => {
  // Public route - no authentication needed
  Content.find({ status: 'published' })
    .populate('author', 'username')
    .then(content => res.json(content))
    .catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
});

// Media routes
app.post('/api/media', authenticate, upload.single('file'), uploadMedia);
app.delete('/api/media/:id', authenticate, deleteMedia);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
