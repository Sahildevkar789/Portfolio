import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { adminInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminInfo) {
            navigate('/admin/login');
        } else {
            navigate('/admin/hero');
        }
    }, [adminInfo, navigate]);

    return (
        <div className="flex items-center justify-center h-64">
            <p>Loading dashboard...</p>
        </div>
    );
};

export default AdminDashboard;
