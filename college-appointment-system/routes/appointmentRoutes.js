const express = require('express');
const { bookAppointment, cancelAppointment } = require('../controllers/appointmentController');
const { getProfessors } = require('../controllers/professorController');

const router = express.Router();

router.put('/book', bookAppointment);

router.put('/:professorId/appointments/:appointmentId/cancel', cancelAppointment);

router.get('/:professorId/appointments', getProfessors)

module.exports = router;
