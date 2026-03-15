import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const SkillBar = ({ name, level, delay }) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
            <span className="text-sm font-medium text-primary-500">{level}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <motion.div
                className="bg-gradient-to-r from-blue-500 to-primary-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
            ></motion.div>
        </div>
    </div>
);

const Skills = () => {
    const [skills, setSkills] = useState([]);
    
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/skills`);
                setSkills(data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        fetchSkills();
    }, []);

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="py-20 px-4 bg-gray-50/50 dark:bg-black/50">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical <span className="text-primary-500">Skills</span></h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {Object.entries(groupedSkills).length > 0 ? (
                        Object.entries(groupedSkills).map(([category, skillsList], index) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="p-8 glass rounded-2xl border border-gray-200 dark:border-gray-800"
                            >
                                <h3 className="text-2xl font-bold mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                    {category}
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {skillsList.map((skill, i) => (
                                        <SkillBar key={skill._id || skill.name} name={skill.name} level={skill.level} delay={i} />
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="md:col-span-2 text-center text-gray-500 py-10">
                            No skills to display.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Skills;
