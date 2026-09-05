require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Project = require('../models/Project');
const projects = require('./projects');

const seed = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error('Cannot seed without MongoDB. Start MongoDB and retry.');
    process.exit(1);
  }

  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log(`Seeded ${projects.length} projects.`);
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
