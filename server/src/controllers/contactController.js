const { validationResult, body } = require('express-validator');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').isLength({ max: 160 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
];

const createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.create({ name, email, message });
      return res.status(201).json({
        success: true,
        message: 'Thanks — your message was received.',
        data: { id: contact._id },
      });
    }

    // Fallback when MongoDB is offline — acknowledge without persistence
    console.log('[contact:fallback]', { name, email, message: message.slice(0, 120) });
    return res.status(201).json({
      success: true,
      message: 'Thanks — your message was received.',
      data: { id: null, persisted: false },
    });
  } catch (error) {
    console.error('Contact create error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to send message right now.' });
  }
};

module.exports = { validateContact, createContact };
