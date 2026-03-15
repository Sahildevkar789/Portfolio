import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ProjectsAdmin = () => {
    const { adminInfo } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ id: null, title: '', description: '', technologies: '', image: '', githubLink: '', liveLink: '', featured: false });
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/projects`);
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
            // convert technologies comma separated string to array safely, sending as array
            const techArray = typeof formData.technologies === 'string' 
                ? formData.technologies.split(',').map(item => item.trim()).filter(item => item !== '')
                : formData.technologies;
            
            const payload = {
                ...formData,
                technologies: techArray
            };

            if (isEditing) {
                await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/projects/${formData.id}`, payload, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/projects`, payload, config);
            }
            setShowForm(false);
            setFormData({ id: null, title: '', description: '', technologies: '', image: '', githubLink: '', liveLink: '', featured: false });
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (project) => {
        setFormData({ 
            id: project._id, 
            title: project.title, 
            description: project.description, 
            technologies: project.technologies.join(', '), 
            image: project.image, 
            githubLink: project.githubLink, 
            liveLink: project.liveLink || '', 
            featured: project.featured || false 
        });
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
                await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/projects/${id}`, config);
                fetchProjects();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Projects</h1>
                <button onClick={() => { setShowForm(true); setIsEditing(false); setFormData({ id: null, title: '', description: '', technologies: '', image: '', githubLink: '', liveLink: '', featured: false }); }} className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2 hover:bg-primary-600">
                    <Plus className="w-4 h-4" /> Add Project
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
                            <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required rows="3" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">GitHub Link</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.githubLink} onChange={e => setFormData({ ...formData, githubLink: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Live Demo Link</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.liveLink} onChange={e => setFormData({ ...formData, liveLink: e.target.value })} />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="featured" className="mr-2" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
                            <label htmlFor="featured" className="text-sm font-medium">Mark as Featured Project</label>
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
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Featured</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {projects.map(project => (
                            <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-hidden">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs font-bold bg-primary-500 text-white">{project.title.charAt(0)}</div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {project.title}
                                    <div className="text-xs text-gray-500">{project.technologies.slice(0, 3).join(', ')}{project.technologies.length > 3 ? '...' : ''}</div>
                                </td>
                                <td className="px-6 py-4">{project.featured ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleEdit(project)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(project._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
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

export default ProjectsAdmin;
