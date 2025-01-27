import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// export const getAppointments = () => API.get('/appointments');
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);

export const createAppointment = async ({ availability, professorId }) => {
    try {
      const response = await axios.post(`/api/professors/${professorId}/availability`,availability);
      return response;
    } catch (error) {
      console.error("Error submitting availability:", error);
      alert("Failed to submit availability. Please try again.");
    }
};

export const getAppointments = async ({ professorId }) => {
    console.log(professorId);
      
    try {
        const response = await axios.get(`/api/professors/${professorId}/availability`);
        return response.data;
      } catch (error) {
        console.error("Error submitting availability:", error);
        alert("Failed to submit availability. Please try again.");
      }
};

export const cancelAppointmentByProfessor = async (professorId, appointmentId) => {
  try {
    const response = await axios.put(`/api/appointments/${professorId}/appointments/${appointmentId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error canceling appointment:', error);
    throw error;
  }
};

export const getProfessorAppointments = async (professorId) => {
  try {
    console.log("in appointment.js");
    
    const response = await axios.get(`api/appointments/${professorId}/appointments`);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};
