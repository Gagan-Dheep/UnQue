import { TextField, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { createAppointment } from '../services/appointment';

function AppointmentForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment({ title, date });
      alert('Appointment created successfully!');
    } catch (err) {
      console.error('Failed to create appointment:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Create
        </Button>
      </form>
    </Container>
  );
}

export default AppointmentForm;
