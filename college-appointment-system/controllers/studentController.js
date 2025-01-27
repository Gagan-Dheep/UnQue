const { getDB } = require('../db/connection');

// Get details of a student
const getStudentDetails = async (req, res) => {
  const { student_id } = req.params;
  const db = getDB();

  try {
    const student = await db.collection('users').findOne({ _id: student_id, role: 'Student' });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send(student);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching student details', error: error.message });
  }
};

module.exports = { getStudentDetails };
