import { getProfessorAppointments } from '../services/appointment';
import React, { useState, useEffect } from 'react';

const ProfessorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const professorId = localStorage.getItem("user")
        console.log(professorId);
        
        const data = await getProfessorAppointments(professorId);
        console.log(data);
        
        setAppointments(data);
      } catch (err) {
        setError('Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    try {
        const professorId = localStorage.getItem("user")
        console.log(professorId);
        
        await cancelAppointmentByProfessor(professorId, appointmentId);
        setSuccessMessage('Appointment canceled successfully');
        setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
    } catch (err) {
        setError('Failed to cancel appointment');
    }
  };

  return (
    <div>
      <h1>Professor Appointments</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <p>
                <strong>Student:</strong> {appointment.studentId} <br />
                <strong>Time Slot:</strong> {appointment.timeSlot} <br />
                <strong>Date:</strong> {appointment.date}
              </p>
              <button onClick={() => handleCancelAppointment(appointment._id)}>Cancel Appointment</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );
};

export default ProfessorAppointments;
