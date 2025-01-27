import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl, Link } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const { login: loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("login spot");
            
            const data = await login({ email, password }); 
            console.log(data.user.email);
            loginUser(data);  
            
            if(data.user.role == "student") {
                navigate('/student');
            }
            else {
                navigate('/professor/appointments');
            }  
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',  
                backgroundColor: '#c2c2c2',
                margin: 0,
                padding: 0,
                position: 'fixed', 
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Container 
                maxWidth="xs" 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    margin: 0, // Remove auto margin
                    padding: '24px',
                }}
            >
                <Typography 
                    variant="h4" 
                    align="center" 
                    color="primary" 
                    gutterBottom
                    sx={{
                        color: 'white' // Make title visible against black background
                    }}
                >
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 3,
                        p: 3,
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        width: '100%',
                    }}
                >
                    <TextField
                        fullWidth
                        required
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }} 
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="student">student</MenuItem>
                            <MenuItem value="professor">professor</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link href="/register" underline="hover" color="primary">
                                register here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;