import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ContactAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        linkedin: '',
        github: '',
        phone: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/contact-info`);
            if (data && Object.keys(data).length > 0) {
                setFormData({
                    email: data.email || '',
                    linkedin: data.linkedin || '',
                    github: data.github || '',
                    phone: data.phone || '',
                    location: data.location || ''
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/contact-info`, formData, config);
            setMessage('Contact information updated successfully!');
        } catch (error) {
            setMessage('Error updating contact information');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold mb-6">Manage Contact Information</h1>
            {message && <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">GitHub URL</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} />
                </div>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default ContactAdmin;
