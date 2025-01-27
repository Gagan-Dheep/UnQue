import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <Container>
      <Typography variant="h5">
        Welcome, {user ? user.username : 'Guest'}!
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

export default Dashboard;
