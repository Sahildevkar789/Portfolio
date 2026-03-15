import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Edit2, Save, X } from 'lucide-react';

const ResearchAdmin = () => {
    const { auth } = useContext(AuthContext);
    const [researchData, setResearchData] = useState({
        title: '',
        author: '',
        abstract: '',
        keywords: '',
        paperLink: '',
        pdfLink: '',
        githubLink: '',
        citation: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchResearch();
    }, []);

    const fetchResearch = async () => {
        try {
            const { data } = await axios.get('/api/research');
            if(data) {
                setResearchData({
                    ...data,
                    keywords: data.keywords ? data.keywords.join(', ') : ''
                });
            }
        } catch (error) {
            console.error('Fetch research error', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResearchData({ ...researchData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            };
            const payload = {
                ...researchData,
                keywords: researchData.keywords.split(',').map(k => k.trim()).filter(k => k)
            };
            await axios.put('/api/research', payload, config);
            setMessage({ type: 'success', text: 'Research updated successfully!' });
            setIsEditing(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error updating research' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">Research Publication Management</h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        <Edit2 size={16} /> Edit Details
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setIsEditing(false); fetchResearch(); }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        >
                            <X size={16} /> Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                )}
            </div>

            {message.text && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={researchData.title}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={researchData.author}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Abstract</label>
                    <textarea
                        name="abstract"
                        value={researchData.abstract}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Keywords (Comma separated)</label>
                    <input
                        type="text"
                        name="keywords"
                        value={researchData.keywords}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. AI, Security, Phishing"
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Paper Link</label>
                        <input
                            type="text"
                            name="paperLink"
                            value={researchData.paperLink}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">PDF Link</label>
                        <input
                            type="text"
                            name="pdfLink"
                            value={researchData.pdfLink}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Github Link</label>
                        <input
                            type="text"
                            name="githubLink"
                            value={researchData.githubLink}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Citation</label>
                        <input
                            type="text"
                            name="citation"
                            value={researchData.citation}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchAdmin;
