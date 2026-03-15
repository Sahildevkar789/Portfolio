import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const SkillsAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ id: null, category: 'Concepts', name: '', level: 0, icon: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/skills`);
            setSkills(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
            if (isEditing) {
                await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/skills/${formData.id}`, formData, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/skills`, formData, config);
            }
            setShowForm(false);
            setFormData({ id: null, category: 'Concepts', name: '', level: 0, icon: '' });
            fetchSkills();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (skill) => {
        setFormData({ id: skill._id, category: skill.category, name: skill.name, level: skill.level, icon: skill.icon || '' });
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
                await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/skills/${id}`, config);
                fetchSkills();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Skills</h1>
                <button onClick={() => { setShowForm(true); setIsEditing(false); setFormData({ id: null, category: 'Concepts', name: '', level: 0, icon: '' }); }} className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2 hover:bg-primary-600">
                    <Plus className="w-4 h-4" /> Add Skill
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded dark:border-gray-700 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Level (0-100)</label>
                            <input type="number" min="0" max="100" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Icon URL or identifier</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">Save</button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 text-sm uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Level</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {skills.map(skill => (
                            <tr key={skill._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                <td className="px-6 py-4 font-medium flex items-center gap-2">
                                    {skill.icon && <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-cover" />}
                                    {skill.name}
                                </td>
                                <td className="px-6 py-4">{skill.category}</td>
                                <td className="px-6 py-4">{skill.level}%</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleEdit(skill)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(skill._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkillsAdmin;
