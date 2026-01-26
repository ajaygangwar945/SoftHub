const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security: Block access to sensitive files
app.use((req, res, next) => {
  const blockedPaths = ['.env', 'server.js', 'package.json', 'package-lock.json'];
  const blockedDirs = ['/src/models', '/src/routes', '/node_modules', '/.git'];
  
  const requestPath = req.path.toLowerCase();
  
  if (blockedPaths.some(file => requestPath.endsWith(file)) || 
      blockedDirs.some(dir => requestPath.startsWith(dir))) {
    return res.status(403).json({ error: 'Access Denied' });
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
const authRoutes = require('./src/routes/auth');
app.use('/api', authRoutes);

// Main route - serve the main page
app.get('/', (req, res) => {
  if (req.headers.accept?.includes('application/json')) {
    return res.json({ 
      message: 'SoftHub API Server', 
      status: 'running',
      version: '2.0.0'
    });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  // Check if it's an API route that doesn't exist
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  // Otherwise serve the requested HTML file or fallback to index
  const filePath = path.join(__dirname, 'public', req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
  });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/softhub';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
app.listen(PORT, () => {
  console.log(`SoftHub server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
