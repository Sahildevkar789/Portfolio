import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const HeroAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        intro: '',
        profileImage: '',
        resumeLink: '',
        backgroundImage: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchHero();
    }, []);

    const fetchHero = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/hero`);
            if (data && Object.keys(data).length > 0) {
                setFormData({
                    name: data.name || '',
                    tagline: data.tagline || '',
                    intro: data.intro || '',
                    profileImage: data.profileImage || '',
                    resumeLink: data.resumeLink || '',
                    backgroundImage: data.backgroundImage || ''
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
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/hero`, formData, config);
            setMessage('Hero section updated successfully!');
        } catch (error) {
            setMessage('Error updating hero section');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold mb-6">Manage Hero Section</h1>
            {message && <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Tagline</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Intro</label>
                    <textarea className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.intro} onChange={e => setFormData({...formData, intro: e.target.value})} required rows="4" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.profileImage} onChange={e => setFormData({...formData, profileImage: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Resume Link (PDF URL)</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.resumeLink} onChange={e => setFormData({...formData, resumeLink: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Background Image URL</label>
                    <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                        value={formData.backgroundImage} onChange={e => setFormData({...formData, backgroundImage: e.target.value})} />
                </div>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default HeroAdmin;
