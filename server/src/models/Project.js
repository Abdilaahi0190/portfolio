const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['mobile', 'fullstack', 'backend', 'research', 'web'],
      required: true,
    },
    featured: { type: Boolean, default: false },
    image: { type: String, default: '' },
    gallery: [{ type: String }],
    role: { type: String, required: true },
    responsibilities: [{ type: String }],
    technologies: [{ type: String }],
    features: [{ type: String }],
    github: { type: String, default: '' },
    liveDemo: { type: String, default: '' },
    year: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
