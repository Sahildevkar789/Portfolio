import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [adminInfo, setAdminInfo] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('adminInfo');
        if (userInfo) {
            setAdminInfo(JSON.parse(userInfo));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/login`,
                { email, password }
            );
            setAdminInfo(data);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        setAdminInfo(null);
        localStorage.removeItem('adminInfo');
    };

    return (
        <AuthContext.Provider value={{ adminInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
