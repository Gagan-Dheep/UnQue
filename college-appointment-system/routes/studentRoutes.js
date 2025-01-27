const express = require('express');
const { getStudentDetails } = require('../controllers/studentController');

const router = express.Router();

// Get student details
router.get('/:student_id', getStudentDetails);

module.exports = router;
