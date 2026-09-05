require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const Project = require('../models/Project');
const projects = require('./projects');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
    for (const p of projects) {
      await Project.findOneAndUpdate(
        { slug: p.slug },
        { $set: { image: p.image, gallery: p.gallery } },
        { upsert: true }
      );
      console.log('updated', p.slug, p.image || '(none)');
    }
    await mongoose.connection.close();
    console.log('done');
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
