import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { Tilt } from 'react-tilt';
import axios from 'axios';

// API instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Tilt
                options={{ max: 15, scale: 1.05, speed: 400 }}
                className="glass rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col group"
            >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                    {project.image && project.image !== 'default.jpg' ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <span className="text-white font-bold text-xl">{project.title.charAt(0)}</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-colors backdrop-blur-sm"
                            >
                                <Github size={20} />
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-colors backdrop-blur-sm"
                            >
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-primary-500 transition-colors">
                            {project.title}
                        </h3>
                        {project.featured && (
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary-500/10 text-primary-500 border border-primary-500/20 rounded-full">
                                Featured
                            </span>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1 whitespace-pre-line">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                // You can sort so featured projects are first
                const sortedProjects = (data || []).sort((a, b) => {
                    if (a.featured === b.featured) return 0;
                    return a.featured ? -1 : 1;
                });
                setProjects(sortedProjects);
            } catch (err) {
                console.error('Error fetching projects', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-primary-500">Projects</span></h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A selection of my recent work. These projects demonstrate my expertise in full-stack development, from database design to responsive frontends.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
                    </div>
                ) : projects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={project._id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-20 text-gray-500">
                        <p>No projects found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
