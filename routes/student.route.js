const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/student.controller');

router.get('/dashboard', getDashboard);

module.exports = router;
