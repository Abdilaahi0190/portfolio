const express = require('express');
const { validateContact, createContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/', validateContact, createContact);

module.exports = router;
