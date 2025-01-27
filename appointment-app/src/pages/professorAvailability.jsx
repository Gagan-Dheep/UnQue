import React, { useState } from "react";
import axios from "axios";
import { createAppointment } from '../services/appointment';

const ProfessorAvailability = () => {
  const [availability, setAvailability] = useState({
    date: "",
    timeSlots: [],
  });
  const [timeSlot, setTimeSlot] = useState("");

  const addTimeSlot = () => {
    if (timeSlot.trim()) {
      setAvailability((prev) => ({
        ...prev,
        timeSlots: [...prev.timeSlots, timeSlot.trim()],
      }));
      setTimeSlot(""); 
    }
  };

  const submitAvailability = async () => {
    const professorId = localStorage.getItem("user"); 
    console.log("prof");
    
    console.log(professorId);
    
    try {
        console.log("avail sub spot");

        const data = await createAppointment({ availability, professorId }); 
        console.log(data);
        
        setAvailability({ date: "", timeSlots: [] }); 
    } catch (error) {
      console.error("Error submitting availability:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Set Availability</h1>

      <label htmlFor="date" style={styles.label}>
        Date:
      </label>
      <input
        type="date"
        id="date"
        value={availability.date}
        onChange={(e) =>
          setAvailability((prev) => ({ ...prev, date: e.target.value }))
        }
        style={styles.input}
      />

      <label htmlFor="timeSlot" style={styles.label}>
        Time Slot:
      </label>
      <input
        type="text"
        id="timeSlot"
        value={timeSlot}
        placeholder="e.g., 09:00-09:30"
        onChange={(e) => setTimeSlot(e.target.value)}
        style={styles.input}
      />
      <button onClick={addTimeSlot} style={styles.button}>
        Add Time Slot
      </button>

      <ul style={styles.timeSlotList}>
        {availability.timeSlots.map((slot, index) => (
          <li key={index} style={styles.timeSlotItem}>
            {slot}
          </li>
        ))}
      </ul>

      <button onClick={submitAvailability} style={styles.submitButton}>
        Submit Availability
      </button>
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "400px", margin: "0 auto" },
  label: { display: "block", marginBottom: "5px", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  timeSlotList: { listStyleType: "none", padding: "0" },
  timeSlotItem: {
    background: "#f4f4f4",
    margin: "5px 0",
    padding: "10px",
    borderRadius: "5px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProfessorAvailability;
