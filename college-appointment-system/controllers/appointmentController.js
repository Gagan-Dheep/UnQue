const { getDB } = require('../db/connection');

const bookAppointment = async (req, res) => {
  
  const { studentId, professorId, timeSlot, date } = req.body;
  const db = getDB();
  const proId = professorId
  try {
    const newAppointment = {
      studentId,
      proId,
      timeSlot,
      date,
      isBooked: true,
    };

    await db.collection('appointments').insertOne(newAppointment);

    await db.collection('professor_availability').updateOne(
      { proId, date, timeSlot },
      { $set: { isBooked: true } }
    );

    res.send({ success: true });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).send({ success: false, message: "Failed to book appointment" });
  }
}

const cancelAppointment = async (req, res) => {
  const { professorId, appointmentId } = req.params; // Get professor ID and appointment ID from params
  const db = getDB();

  try {
      // Find the appointment to verify it exists and belongs to the professor
      const appointment = await db.collection('appointments').findOne({ _id: appointmentId, professorId });

      if (!appointment) {
          return res.status(404).send({ success: false, message: 'Appointment not found or does not belong to the professor' });
      }

      // Update the appointment to set it as canceled
      await db.collection('appointments').updateOne(
          { _id: appointmentId },
          { $set: { isBooked: false, isCanceled: true, canceledBy: 'professor' } }
      );

      // Update the professor's availability for the canceled slot
      await db.collection('professor_availability').updateOne(
          { professorId, date: appointment.date, timeSlot: appointment.timeSlot },
          { $set: { isBooked: false } }
      );

      res.send({ success: true, message: 'Appointment successfully canceled' });
  } catch (error) {
      console.error("Error canceling appointment:", error);
      res.status(500).send({ success: false, message: 'Failed to cancel appointment' });
  }
};

const getProfessorAppointments = async (req, res) => {
  const { professorId } = req.params;
  const db = getDB();
  console.log("get getProfessorAppointments");
  
  try {
    const appointments = await db.collection('appointments').find({ professorId }).toArray();

    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ success: false, message: 'No appointments found for this professor' });
    }

    res.send(appointments);
  } catch (error) {
    console.error('Error fetching professor appointments:', error);
    res.status(500).send({ success: false, message: 'Failed to fetch appointments' });
  }
};

module.exports = { bookAppointment, cancelAppointment, getProfessorAppointments };
