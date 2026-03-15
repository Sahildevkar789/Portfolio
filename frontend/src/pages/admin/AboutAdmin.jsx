import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AboutAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        bio: '',
        education: [],
        goals: '',
        interests: []
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/about`);
            if (data && Object.keys(data).length > 0) {
                setFormData({
                    bio: data.bio || '',
                    education: data.education || [],
                    goals: data.goals || '',
                    interests: data.interests || []
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
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/about`, formData, config);
            setMessage('About section updated successfully!');
        } catch (error) {
            setMessage('Error updating about section');
        } finally {
            setLoading(false);
        }
    };

    const handleArrayChange = (field, value) => {
        const arr = value.split(',').map(item => item.trim()).filter(item => item !== '');
        setFormData({ ...formData, [field]: arr });
    };

    return (
        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold mb-6">Manage About Section</h1>
            {message && <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Biography</label>
                    <textarea className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} required rows="5" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Education (comma separated)</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.education.join(', ')} onChange={e => handleArrayChange('education', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Career Goals</label>
                    <textarea className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.goals} onChange={e => setFormData({...formData, goals: e.target.value})} rows="3" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Interests (comma separated)</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.interests.join(', ')} onChange={e => handleArrayChange('interests', e.target.value)} />
                </div>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default AboutAdmin;
