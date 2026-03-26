import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EMPTY_FORM = {
    role: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    type: 'Internship',
    description: '',   // newline-separated in the textarea, stored as array
};

const ExperienceAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [experiences, setExperiences] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => { fetchExperiences(); }, []);

    const fetchExperiences = async () => {
        try {
            const { data } = await axios.get(`${API}/experience`);
            setExperiences(data);
        } catch (err) {
            console.error('Error fetching experiences:', err);
        }
    };

    const authConfig = () => ({
        headers: { Authorization: `Bearer ${adminInfo.token}` }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        try {
            const payload = {
                ...formData,
                description: formData.description
                    .split('\n')
                    .map(s => s.trim())
                    .filter(Boolean),
            };

            if (isEditing) {
                await axios.put(`${API}/experience/${currentId}`, payload, authConfig());
                setMessage({ text: 'Experience updated successfully!', type: 'success' });
            } else {
                await axios.post(`${API}/experience`, payload, authConfig());
                setMessage({ text: 'Experience added successfully!', type: 'success' });
            }
            resetForm();
            fetchExperiences();
        } catch (err) {
            setMessage({ text: 'Error saving experience', type: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this experience?')) return;
        try {
            await axios.delete(`${API}/experience/${id}`, authConfig());
            fetchExperiences();
        } catch (err) {
            console.error('Error deleting experience:', err);
        }
    };

    const editExperience = (exp) => {
        setIsEditing(true);
        setCurrentId(exp._id);
        setFormData({
            role: exp.role || '',
            company: exp.company || '',
            location: exp.location || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            type: exp.type || 'Internship',
            description: Array.isArray(exp.description) ? exp.description.join('\n') : '',
        });
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData(EMPTY_FORM);
    };

    const field = (key, val) => setFormData(f => ({ ...f, [key]: val }));

    const inputCls = "w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-primary-500 text-sm";
    const labelCls = "block text-sm font-medium mb-1";

    return (
        <div className="max-w-4xl mx-auto text-black dark:text-white">
            <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold">Manage Experience</h2>
            </div>

            {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                    message.type === 'success'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                }`}>
                    {message.text}
                </div>
            )}

            {/* ── Form ── */}
            <form
                onSubmit={handleSubmit}
                className="mb-10 bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
            >
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-xl font-semibold">
                        {isEditing ? 'Edit Experience' : 'Add New Experience'}
                    </h3>
                    {isEditing && (
                        <button type="button" onClick={resetForm} className="text-gray-500 hover:text-red-500 p-1">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelCls}>Role / Title *</label>
                        <input type="text" required className={inputCls}
                            placeholder="e.g. Cyber Security Intern"
                            value={formData.role} onChange={e => field('role', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelCls}>Company *</label>
                        <input type="text" required className={inputCls}
                            placeholder="e.g. Cyber Leelavat"
                            value={formData.company} onChange={e => field('company', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelCls}>Location</label>
                        <input type="text" className={inputCls}
                            placeholder="e.g. Mumbai"
                            value={formData.location} onChange={e => field('location', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelCls}>Type</label>
                        <select className={inputCls}
                            value={formData.type} onChange={e => field('type', e.target.value)}>
                            {['Internship', 'Full-time', 'Part-time', 'Freelance', 'Contract'].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>Start Date *</label>
                        <input type="text" required className={inputCls}
                            placeholder="e.g. Feb 2026"
                            value={formData.startDate} onChange={e => field('startDate', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelCls}>End Date</label>
                        <input type="text" className={inputCls}
                            placeholder="e.g. Mar 2026 or Present"
                            value={formData.endDate} onChange={e => field('endDate', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelCls}>
                            Responsibilities / Description{' '}
                            <span className="text-gray-400 font-normal">(one bullet point per line)</span>
                        </label>
                        <textarea
                            className={`${inputCls} resize-y`}
                            rows={5}
                            placeholder={"Performed web application vulnerability testing\nConducted penetration testing and bug identification"}
                            value={formData.description}
                            onChange={e => field('description', e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    {isEditing ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {isEditing ? 'Update Experience' : 'Add Experience'}
                </button>
            </form>

            {/* ── Existing Records ── */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Existing Experience Records</h3>
                {experiences.length === 0 ? (
                    <p className="text-gray-500 text-sm">No experience records yet. Add one above.</p>
                ) : (
                    experiences.map((exp) => (
                        <div
                            key={exp._id}
                            className="bg-white dark:bg-[#111] p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-start gap-4"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-bold text-base">{exp.role}</h4>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full
                                        bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                                        {exp.type}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
                                    {exp.company}{exp.location ? ` • ${exp.location}` : ''} • {exp.startDate} – {exp.endDate || 'Present'}
                                </p>
                                {exp.description?.length > 0 && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {exp.description.length} bullet point{exp.description.length !== 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button
                                    onClick={() => editExperience(exp)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(exp._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExperienceAdmin;
