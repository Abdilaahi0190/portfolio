require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const Project = require('./models/Project');
const seedProjects = require('./data/projects');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    mongo: require('mongoose').connection.readyState === 1 ? 'connected' : 'fallback',
  });
});

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
});

const start = async () => {
  const connected = await connectDB();

  if (connected) {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(seedProjects);
      console.log(`Auto-seeded ${seedProjects.length} projects.`);
    }
  }

  app.listen(PORT, () => {
    console.log(`Portfolio API listening on http://localhost:${PORT}`);
  });
};

start();
