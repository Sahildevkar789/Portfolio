import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const EducationAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [educations, setEducations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        level: '',
        institution: '',
        board: '',
        year: '',
        grade: '',
        field: '',
        status: ''
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/education`);
            setEducations(data);
        } catch (error) {
            console.error('Error fetching education:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${adminInfo.token}` }
            };

            if (isEditing) {
                await axios.put(`${API_URL}/education/${currentId}`, formData, config);
                alert('Education updated successfully');
            } else {
                await axios.post(`${API_URL}/education`, formData, config);
                alert('Education added successfully');
            }

            resetForm();
            fetchEducation();
        } catch (error) {
            console.error('Error saving education:', error);
            alert('Failed to save education');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this education record?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${adminInfo.token}` }
                };
                await axios.delete(`${API_URL}/education/${id}`, config);
                fetchEducation();
            } catch (error) {
                console.error('Error deleting education:', error);
            }
        }
    };

    const editEducation = (edu) => {
        setIsEditing(true);
        setCurrentId(edu._id);
        setFormData({
            level: edu.level || '',
            institution: edu.institution || '',
            board: edu.board || '',
            year: edu.year || '',
            grade: edu.grade || '',
            field: edu.field || '',
            status: edu.status || ''
        });
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData({
            level: '',
            institution: '',
            board: '',
            year: '',
            grade: '',
            field: '',
            status: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto text-black dark:text-white">
            <h2 className="text-2xl font-bold mb-6">Manage Education</h2>

            <form onSubmit={handleSubmit} className="mb-10 bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{isEditing ? 'Edit Education' : 'Add New Education'}</h3>
                    {isEditing && (
                        <button type="button" onClick={resetForm} className="text-gray-500 hover:text-red-500 p-1">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Level *</label>
                        <input
                            type="text"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500"
                            placeholder="e.g. Bachelor's Degree, 12th Standard"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Institution Name *</label>
                        <input
                            type="text"
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500"
                            placeholder="School or College Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Board / University</label>
                        <input
                            type="text"
                            value={formData.board}
                            onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500"
                            placeholder="e.g. University of Mumbai"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Year of Completion *</label>
                        <input
                            type="text"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500"
                            placeholder="e.g. 2023 - 2027 or 2023"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Grade / Percentage</label>
                        <input
                            type="text"
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500"
                            placeholder="e.g. 9.5 CGPA or 95%"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Field of Study</label>
                        <input
                            type="text"
                            value={formData.field}
                            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500"
                            placeholder="e.g. Computer Engineering"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <input
                            type="text"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500"
                            placeholder="e.g. Currently Pursuing"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    {isEditing ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {isEditing ? 'Update Education' : 'Add Education'}
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Existing Education Records</h3>
                {educations.length === 0 ? (
                    <p className="text-gray-500">No education records found. Add one above.</p>
                ) : (
                    educations.map((edu) => (
                        <div key={edu._id} className="bg-white dark:bg-[#111] p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg">{edu.level}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.institution} • {edu.year}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => editEducation(edu)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(edu._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EducationAdmin;
