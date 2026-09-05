const mongoose = require('mongoose');
const Project = require('../models/Project');
const fallbackProjects = require('../data/projects');

const bySlug = Object.fromEntries(fallbackProjects.map((p) => [p.slug, p]));

const enrich = (item) => {
  if (!item) return item;
  const seed = bySlug[item.slug];
  if (!seed) return item;

  return {
    ...item,
    image: item.image || seed.image || '',
    gallery:
      Array.isArray(item.gallery) && item.gallery.length > 0
        ? item.gallery
        : seed.gallery || [],
  };
};

const getSource = async () => {
  if (mongoose.connection.readyState === 1) {
    const count = await Project.countDocuments();
    if (count > 0) return 'db';
  }
  return 'memory';
};

const listProjects = async (req, res) => {
  try {
    const { featured, category } = req.query;
    const source = await getSource();

    let items =
      source === 'db'
        ? await Project.find().sort({ order: 1 }).lean()
        : [...fallbackProjects].sort((a, b) => a.order - b.order);

    items = items.map(enrich);

    if (featured === 'true') items = items.filter((p) => p.featured);
    if (category) items = items.filter((p) => p.category === category);

    return res.json({ success: true, source, count: items.length, data: items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to load projects.' });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const source = await getSource();

    let item =
      source === 'db'
        ? await Project.findOne({ slug }).lean()
        : fallbackProjects.find((p) => p.slug === slug);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.json({ success: true, source, data: enrich(item) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to load project.' });
  }
};

module.exports = { listProjects, getProjectBySlug };
