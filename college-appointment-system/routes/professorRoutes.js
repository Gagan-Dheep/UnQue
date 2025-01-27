const express = require('express');
const { setAvailability, getAvailability, getProfessors } = require('../controllers/professorController');
const { getProfessorAppointments } = require('../controllers/appointmentController')

const router = express.Router();

router.post('/:professorId/availability', setAvailability);

router.get('/:professor_id/availability', getAvailability);

router.get('/:professor_id/appointments', getProfessorAppointments);

module.exports = router;
