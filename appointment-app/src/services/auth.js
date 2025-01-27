import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post('/api/auth/login', { email, password });
        
        return response.data; 
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

export const register = async ({ username, email, password, role }) => {
    try {
        const response = await axios.post('/api/auth/register', { username, email, password, role });

        return response.data;
    } catch (error) {
        throw new Error('Registration failed: ' + error.message);
    }
};

// export const login = (credentials) => API.post('/auth/login', credentials);
// export const signup = (data) => API.post('/auth/signup', data);