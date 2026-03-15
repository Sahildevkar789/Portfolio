import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FileText, Download, Github, BookOpen, Quote, ExternalLink, Award } from 'lucide-react';

const ResearchPublication = () => {
    const [researchData, setResearchData] = useState(null);

    useEffect(() => {
        const fetchResearch = async () => {
            try {
                const { data } = await axios.get('/api/research');
                setResearchData(data);
            } catch (error) {
                console.error("Error fetching research data:", error);
            }
        };
        fetchResearch();
    }, []);

    if (!researchData) {
        return null; // Return nothing until data is loaded
    }

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Research <span className="text-primary-500">Publication</span></h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative group w-full max-w-5xl mx-auto"
                >
                    {/* Glowing effect behind card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                    
                    {/* Main Card - LIGHTER BG PURPLE */}
                    <div className="relative glass bg-[#1a0f2e] border border-purple-500/30 backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 overflow-hidden z-10">
                        
                        {/* Abstract Background pattern */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Left Column: Icon & Badges */}
                        <div className="flex flex-col items-center justify-center md:w-1/4 shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                <BookOpen className="w-16 h-16 md:w-20 md:h-20 text-purple-400" />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex items-center justify-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                                    <Award className="w-4 h-4" /> Published Research
                                </div>
                                <div className="flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                                    IEEE Style Format
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="flex-1 flex flex-col justify-center relative">
                            <Quote className="absolute -top-4 -left-2 w-16 h-16 text-white/5 disabled" />
                            
                            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                                {researchData.title}
                            </h3>
                            
                            <p className="text-lg text-purple-200 font-medium mb-6">
                                Author: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-bold">{researchData.author}</span>
                            </p>

                            <div className="mb-6">
                                <h4 className="flex items-center gap-2 font-bold text-gray-300 mb-2 uppercase text-sm tracking-widest">
                                    <FileText className="w-4 h-4 text-purple-500" /> Abstract
                                </h4>
                                <p className="text-purple-100/80 leading-relaxed text-base md:text-lg">
                                    {researchData.abstract}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-bold text-purple-200 mb-3 uppercase text-sm tracking-widest">Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {researchData.keywords && researchData.keywords.map((keyword, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md text-sm text-purple-200 transition-colors cursor-default">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 mt-auto">
                                <a 
                                    href={researchData.paperLink} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                >
                                    <ExternalLink className="w-4 h-4" /> View Paper
                                </a>
                                <a 
                                    href={researchData.pdfLink} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-purple-600/30 text-purple-200 hover:text-white hover:bg-purple-600/50 border border-purple-400/50 font-bold rounded-lg transition-colors"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </a>
                                <a 
                                    href={researchData.githubLink}
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#0a0a0a]/50 text-purple-300 hover:text-white hover:bg-[#0a0a0a]/80 font-bold rounded-lg transition-colors border border-purple-500/30"
                                >
                                    <Github className="w-4 h-4" /> View Project
                                </a>
                            </div>

                            {/* Citation Format Footer */}
                            <div className="mt-8 pt-4 border-t border-purple-500/20">
                                <p className="text-xs text-purple-300/60 font-mono">
                                    <span className="text-purple-300/80 font-bold">Cite:</span> {researchData.citation}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResearchPublication;
