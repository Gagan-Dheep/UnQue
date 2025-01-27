import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointments } from "../services/appointment";

const StudentPage = () => {
  const [availability, setAvailability] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [error, setError] = useState("");
  const [bookingStatus, setBookingStatus] = useState(""); // To track booking status

  const fetchProfessors = async () => {
    try {
      const response = await axios.get("/api/professors/getProfessor");
      setProfessors(response.data);
    } catch (error) {
      console.error("Error fetching professors:", error.message);
      setError("Failed to fetch professors. Please try again.");
    }
  };

  const fetchAvailability = async () => {
    if (!selectedProfessorId) {
      setError("Please select a professor first.");
      return;
    }

    try {
      const data = await getAppointments({ professorId: selectedProfessorId });
      setAvailability(data);
      setError(""); // Clear errors
    } catch (error) {
      console.error("Error fetching availability:", error.message);
      setError("Failed to fetch availability. Please try again.");
      setAvailability([]); 
    }
  };

  const handleBookAppointment = async (slot) => {
    const studentId = localStorage.getItem("user"); 
    console.log(slot);
    
    if (!studentId) {
      setError("Please login first.");
      return;
    }

    const appointmentData = {
      studentId,
      professorId: slot.proId,
      timeSlot: slot.timeSlot,
      date: slot.date,
    };

    try {
      const response = await axios.put("/api/appointments/book", appointmentData);
      if (response.data.success) {
        setBookingStatus("Appointment booked successfully!");
        setAvailability((prevAvailability) =>
          prevAvailability.map((s) =>
            s._id === slot._id ? { ...s, isBooked: true } : s
          )
        );
      } else {
        setBookingStatus("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error.message);
      setBookingStatus("Failed to book appointment. Please try again.");
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  return (
    <div style={styles.container}>
      <h1>View Professor's Availability</h1>

      <label htmlFor="professorDropdown" style={styles.label}>
        Select Professor:
      </label>
      <select
        id="professorDropdown"
        value={selectedProfessorId}
        onChange={(e) => setSelectedProfessorId(e.target.value)}
        style={styles.dropdown}
      >
        <option value="">-- Select a Professor --</option>
        {professors.map((professor) => (
          <option key={professor._id} value={professor.email}>
            {professor.username} ({professor.email})
          </option>
        ))}
      </select>

      <button onClick={fetchAvailability} style={styles.button}>
        Fetch Availability
      </button>

      {error && <p style={styles.error}>{error}</p>}
      {bookingStatus && <p style={styles.bookingStatus}>{bookingStatus}</p>}

      {availability.length > 0 && (
        <ul style={styles.availabilityList}>
          {availability.map((slot, index) => (
            <li key={index} style={styles.availabilityItem}>
              <strong>Date:</strong> {slot.date}, <strong>Time:</strong> {slot.timeSlot}
              {!slot.isBooked ? (
                <button
                  onClick={() => handleBookAppointment(slot)}
                  style={styles.bookButton}
                >
                  Book Appointment
                </button>
              ) : (
                <span> (Booked)</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "500px", margin: "0 auto" },
  label: { display: "block", marginBottom: "5px", fontWeight: "bold" },
  dropdown: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: { color: "red", marginTop: "10px" },
  bookingStatus: { color: "green", marginTop: "10px" },
  availabilityList: { listStyleType: "none", padding: "0", marginTop: "20px" },
  availabilityItem: {
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  bookButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default StudentPage;
