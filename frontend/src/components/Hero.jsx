import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowRight, TerminalSquare, Code2 } from 'lucide-react';

const Hero = () => {
    const [heroData, setHeroData] = useState({
        name: 'Sahil',
        tagline: 'Turning Vision Into \n Digital Reality',
        intro: 'Full Stack Developer | Backend Specialist | Cloud & Cybersecurity Enthusiast.\nBuilding modern, scalable, and responsive web applications.',
        resumeLink: '/resume.pdf',
        profileImage: '',
        backgroundImage: ''
    });

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/hero`);
                if (data && Object.keys(data).length > 0) {
                    setHeroData(data);
                }
            } catch (error) {
                console.error('Error fetching hero data:', error);
            }
        };
        fetchHero();
    }, []);

    // Split tagline by newline if user entered formatting
    const formattedTagline = heroData.tagline?.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {i === 1 ? <span className="text-gradient">{line}</span> : line}
            {i === 0 && <br />}
        </React.Fragment>
    ));

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 relative">
            {heroData.backgroundImage && (
                <div 
                    className="absolute inset-0 z-0 opacity-10 dark:opacity-20 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
                ></div>
            )}
            
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
                {/* Text Content */}
                <motion.div
                    className="flex-1 text-center lg:text-left z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm text-sm font-medium"
                    >
                        👋 Hello, I'm {heroData.name}
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {heroData.tagline.includes('\\n') ? (
                            heroData.tagline.split('\\n').map((line, idx, arr) => (
                                <span key={idx} className={idx === arr.length - 1 ? "text-gradient block" : "block"}>{line}</span>
                            ))
                        ) : (
                            <span>{heroData.tagline}</span>
                        )}
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 whitespace-pre-line"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {heroData.intro}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            View Projects <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3.5 rounded-full border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                            Contact Me <Mail className="w-4 h-4" />
                        </a>
                        {(heroData.resumeLink || '/resume.pdf') && (
                            <a
                                href={heroData.resumeLink || '/resume.pdf'}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary-500 font-medium hover:underline flex items-center gap-1 mt-4 sm:mt-0 sm:ml-2"
                            >
                                View Resume <Download className="w-4 h-4" />
                            </a>
                        )}
                    </motion.div>
                </motion.div>

                {/* Image/Visual Content */}
                <motion.div
                    className="flex-1 flex justify-center lg:justify-end z-10 w-full max-w-md lg:max-w-xl mt-12 lg:mt-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] flex items-center justify-center">
                        {/* Futuristic Circular Halo / Glow Behind */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-blue-600 to-pink-500 rounded-full blur-[80px] opacity-40 animate-pulse" style={{ animationDuration: '4s' }}></div>
                        <div className="absolute inset-10 bg-gradient-to-br from-indigo-500 to-purple-800 rounded-full blur-[50px] opacity-50"></div>

                        {/* Animated Light Streaks / Particles around */}
                        <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa] blur-[1px]"></div>
                            <div className="absolute bottom-1/4 right-0 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_20px_#c084fc] blur-[1px]"></div>
                            <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_15px_#f472b6] blur-[1px]"></div>
                        </div>

                        {/* Profile Image - Floating & Big Cutout */}
                        <motion.div 
                            className="relative z-10 w-full h-full flex items-end justify-center drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-pointer"
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {heroData.profileImage ? (
                                <img 
                                    src={heroData.profileImage} 
                                    alt={heroData.name} 
                                    className="w-[125%] h-[125%] max-w-none object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" 
                                />
                            ) : (
                                <div className="w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
                                    <TerminalSquare className="w-24 h-24 text-purple-400 opacity-60 mb-6" />
                                    <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10 text-purple-300">
                                        &lt;Developer /&gt;
                                    </div>
                                </div>
                            )}
                        </motion.div>
                        
                        {/* Floating Tech Badges elements styling */}
                        <motion.div 
                            className="absolute top-10 -left-4 md:-left-10 bg-[#111]/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-tr from-purple-500 to-blue-500 text-white font-extrabold text-sm shadow-inner">
                                <Code2 className="w-6 h-6" />
                            </div>
                        </motion.div>

                        <motion.div 
                            className="absolute bottom-20 -right-4 md:-right-10 bg-[#111]/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                            animate={{ y: [5, -5, 5] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-tr from-blue-500 to-emerald-500 text-white font-extrabold text-sm shadow-inner">
                                <TerminalSquare className="w-6 h-6" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
