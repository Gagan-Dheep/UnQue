import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  

    const login = (user) => {
        
        setUser(user.user);  
        localStorage.setItem('token', JSON.stringify(user.token));
        localStorage.setItem('user', JSON.stringify(user.user.email));  
    };

    const logout = () => {
        setUser(null);  
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
