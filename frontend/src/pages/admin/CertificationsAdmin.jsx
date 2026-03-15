import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const CertificationsAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [certs, setCerts] = useState([]);
    const [formData, setFormData] = useState({ id: null, title: '', organization: '', date: '', certificateImage: '', certificateLink: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchCerts();
    }, []);

    const fetchCerts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certifications`);
            setCerts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
            if (isEditing) {
                await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certifications/${formData.id}`, formData, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certifications`, formData, config);
            }
            setShowForm(false);
            setFormData({ id: null, title: '', organization: '', date: '', certificateImage: '', certificateLink: '' });
            fetchCerts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (cert) => {
        setFormData({ id: cert._id, title: cert.title, organization: cert.organization, date: cert.date || '', certificateImage: cert.certificateImage || '', certificateLink: cert.certificateLink || '' });
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
                await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certifications/${id}`, config);
                fetchCerts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Certifications</h1>
                <button onClick={() => { setShowForm(true); setIsEditing(false); setFormData({ id: null, title: '', organization: '', date: '', certificateImage: '', certificateLink: '' }); }} className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2 hover:bg-primary-600">
                    <Plus className="w-4 h-4" /> Add Certification
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded dark:border-gray-700 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Organization</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.organization} onChange={e => setFormData({ ...formData, organization: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Certificate Image URL</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.certificateImage} onChange={e => setFormData({ ...formData, certificateImage: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Certificate Link</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.certificateLink} onChange={e => setFormData({ ...formData, certificateLink: e.target.value })} />
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
                            <th className="px-6 py-4">Image / Link</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Organization</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {certs.map(cert => (
                            <tr key={cert._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
                                        {cert.certificateImage ? (
                                            <img src={cert.certificateImage} alt={cert.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs font-bold bg-primary-500 text-white">{cert.title.charAt(0)}</div>
                                        )}
                                    </div>
                                    {cert.certificateLink && <a href={cert.certificateLink} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">View</a>}
                                </td>
                                <td className="px-6 py-4 font-medium">{cert.title}</td>
                                <td className="px-6 py-4">{cert.organization}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleEdit(cert)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(cert._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
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

export default CertificationsAdmin;
