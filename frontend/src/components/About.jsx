import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, GraduationCap, Code2, Cloud } from 'lucide-react';

const About = () => {
    const [educations, setEducations] = useState([]);
    const [aboutData, setAboutData] = useState({
        bio: '',
        education: [],
        goals: '',
        interests: []
    });

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/about`);
                if (data && Object.keys(data).length > 0) {
                    setAboutData({
                        bio: data.bio || '',
                        education: data.education || [],
                        goals: data.goals || '',
                        interests: data.interests || []
                    });
                }
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        const fetchEducation = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/education`);
                if (data && Array.isArray(data)) {
                    setEducations(data);
                }
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };
        fetchAbout();
        fetchEducation();
    }, []);

    // Helper text for interests if array is empty
    const interestsList = aboutData.interests.length > 0 ? aboutData.interests : ['Cloud Computing', 'Web Development'];

    return (
        <section id="about" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">About <span className="text-primary-500">Me</span></h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed whitespace-pre-line">
                            {aboutData.bio || "Hello, I am a passionate developer eager to build impactful software..."}
                        </p>
                        
                        {aboutData.goals && (
                            <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#111]/50">
                                <h4 className="font-bold mb-2 flex items-center gap-2">
                                    <Code2 className="w-5 h-5 text-primary-500" /> Career Goals
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">{aboutData.goals}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {interestsList.map((interest, idx) => (
                                <div key={idx} className="p-4 glass rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 transition-colors">
                                    {idx % 2 === 0 ? <Cloud className="w-8 h-8 text-blue-500 mb-2" /> : <Code2 className="w-8 h-8 text-green-500 mb-2" />}
                                    <h3 className="font-bold text-lg">{interest}</h3>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="p-8 glass rounded-2xl border border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="w-8 h-8 text-primary-500" />
                            <h3 className="text-2xl font-bold">Education Journey</h3>
                        </div>

                        {educations.length > 0 ? (
                            <div className="space-y-8">
                                {educations.map((edu, idx) => (
                                    <div key={edu._id || idx} className="relative border-l-2 border-primary-500/50 dark:border-primary-500/30 ml-4 pl-6 pb-2 group">
                                        <div className="absolute w-4 h-4 bg-white dark:bg-[#111] rounded-full -left-[9px] top-0 border-4 border-primary-500 group-hover:scale-125 group-hover:bg-primary-500 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                        <h4 className="text-xl font-bold text-black dark:text-white leading-tight mb-1">
                                            {edu.level} {edu.field && <span className="text-primary-500 font-medium text-lg">({edu.field})</span>}
                                        </h4>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 mt-1">{edu.institution}</p>
                                        {edu.board && <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">Board/University: {edu.board}</p>}
                                        <div className="flex flex-wrap gap-2 mt-3 text-sm font-medium">
                                            <span className="bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full border border-primary-100 dark:border-primary-900/30">
                                                Year: {edu.year}
                                            </span>
                                            {edu.grade && (
                                                <span className="bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full border border-primary-100 dark:border-primary-900/30">
                                                    Grade/Score: {edu.grade}
                                                </span>
                                            )}
                                            {edu.status && (
                                                <span className="bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
                                                    Status: {edu.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : aboutData.education.length > 0 ? (
                            <div className="space-y-6">
                                {aboutData.education.map((edu, idx) => (
                                    <div key={idx} className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 pl-6 pb-2">
                                        <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-0 border-4 border-white dark:border-black"></div>
                                        <h4 className="text-lg font-bold text-black dark:text-white leading-tight mb-2">{edu}</h4>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 pl-8 pb-8">
                                <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-0 border-4 border-white dark:border-black"></div>
                                <h4 className="text-xl font-bold text-black dark:text-white">B.Tech Computer Engineering</h4>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Focusing on full-stack development, algorithms, system design, and cutting-edge software engineering practices.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
