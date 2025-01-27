const { getDB } = require('../db/connection');

const setAvailability = async (req, res) => {
  console.log("set");
  console.log(req.body );
  console.log(req.params);
  
  
  console.log(req.params.professorId);
  const proId = req.params.professorId;
  const { professor_id, date, timeSlots } = req.body;
  const db = getDB();

  if (!date || !timeSlots || !Array.isArray(timeSlots)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const collection = db.collection('professor_availability');
    const availability = timeSlots.map(slot => ({
      proId,
      date,
      timeSlot: slot,
      isBooked: false
    }));
    await collection.insertMany(availability);
    res.status(201).send({ message: 'Availability set successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error setting availability', error: error.message });
  }
};

const getAvailability = async (req, res) => {
  const professor_id = req.params.professorId;
  const db = getDB();

  try {
    const availability = await db.collection('professor_availability').find({ professor_id, isBooked: false }).toArray();
    res.send(availability);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching availability', error: error.message });
  }
};

const getProfessors = async (req, res) => {
  const db = getDB();

  try {
    const collection = db.collection('users'); 
    const professors = await collection.find({ role: "professor" }).toArray();
    res.status(200).send(professors);
  } catch (error) {
    console.error("Error fetching professors:", error.message);
    res.status(500).send({ message: "Error fetching professors", error: error.message });
  }
};

module.exports = { setAvailability, getAvailability, getProfessors };
