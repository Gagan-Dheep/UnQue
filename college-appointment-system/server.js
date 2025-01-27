const express = require('express');
const { connectDB } = require('./db/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/professors', require('./routes/professorRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
