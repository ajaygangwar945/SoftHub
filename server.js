const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security: Block access to sensitive files
app.use((req, res, next) => {
  const sensitiveFiles = ['.env', 'server.js', 'package.json', 'package-lock.json'];
  const sensitiveDirs = ['/models', '/routes', '/node_modules', '/.git'];

  if (sensitiveFiles.includes(req.path.slice(1)) || sensitiveDirs.some(dir => req.path.startsWith(dir))) {
    return res.status(403).send('Access Denied');
  }
  next();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Redirect root to main page
app.get('/', (req, res) => {
  res.redirect('/main-pages/index.html');
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/softhub';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Import routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Routes for backward compatibility
app.post('/register', require('./routes/auth').register);
app.post('/signin', require('./routes/auth').signin);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SoftHub Backend Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

