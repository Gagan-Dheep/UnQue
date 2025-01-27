import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx'
import Dashboard from './pages/dashboard.jsx';
import AppointmentForm from './pages/appointmentForm.jsx';
import ProfessorAvailability from './pages/professorAvailability.jsx';
import StudentPage from './pages/studentPage.jsx';
import ProfessorAppointments from './pages/professorAppointments.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/professor" element={<ProfessorAvailability />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/appointments/new" element={<AppointmentForm />} />
        <Route path="/professor/appointments" element={<ProfessorAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;
