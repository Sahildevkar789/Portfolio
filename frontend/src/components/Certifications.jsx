import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Loader2 } from 'lucide-react';

const Certifications = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/certifications`);
                setCerts(data);
            } catch (error) {
                console.error('Error fetching certifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    return (
        <section id="certifications" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Licenses & <span className="text-primary-500">Certifications</span></h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
                    </div>
                ) : certs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certs.map((cert, index) => (
                            <motion.div
                                key={cert._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 glass rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 transition-colors group flex flex-col h-full"
                            >
                                <div className="w-12 h-12 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
                                    {cert.certificateImage ? (
                                        <img src={cert.certificateImage} alt={cert.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Award className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{cert.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-1">{cert.organization}</p>
                                <p className="text-sm text-gray-500 mb-4 flex-1">{cert.date}</p>

                                {cert.certificateLink && (
                                    <a
                                        href={cert.certificateLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 mt-auto"
                                    >
                                        Show credential <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-20 text-gray-500">
                        <p>No certifications found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certifications;
