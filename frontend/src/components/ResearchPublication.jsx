import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, Download, Github, BookOpen, Quote, 
    ExternalLink, Award, ChevronRight, Share2, 
    Calendar, Copy, Check, Users, Eye, TrendingUp, 
    ShieldCheck, GraduationCap, Microscope
} from 'lucide-react';

const ResearchPublication = () => {
    const [researchData, setResearchData] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchResearch = async () => {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            try {
                const { data } = await axios.get(`${API_URL}/research`);
                setResearchData(data);
            } catch (error) {
                console.error("Error fetching research data:", error);
                // Fallback for demonstration if API fails
                setResearchData({
                    title: "AI-Powered QR Code Scam Detector for Phishing Detection",
                    author: "Sahil Santosh Devkar",
                    abstract: "This research presents a novel approach to detecting phishing attacks embedded within QR codes using machine learning and computer vision. By analyzing the structural patterns and destination URLs of QR codes, our system can identify malicious redirections with 98.4% accuracy, providing a critical layer of security for mobile users in the evolving threat landscape.",
                    keywords: ["Cybersecurity", "AI Security", "QR Code Security", "Phishing Detection"],
                    paperLink: "#",
                    pdfLink: "#",
                    githubLink: "#",
                    citation: 'Devkar, S. S., "AI-Powered QR Code Scam Detector for Phishing Detection," IEEE International Conference on Cybersecurity 2026.',
                    year: "2026",
                    domain: "Cybersecurity & AI",
                    impact: { views: "1.2k", downloads: "450", citations: "12" }
                });
            }
        };
        fetchResearch();
    }, []);

    const copyToClipboard = () => {
        if (researchData?.citation) {
            navigator.clipboard.writeText(researchData.citation);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!researchData) return null;

    // Helper to highlight author name
    const formatAuthor = (author) => {
        if (!author) return ""; 
        const target = "Sahil Santosh Devkar";
        if (author.includes(target)) {
            const parts = author.split(target);
            return (
                <>
                    {parts[0]}
                    <span className="text-white font-black underline decoration-purple-500/50 underline-offset-4 decoration-2">
                        {target}
                    </span>
                    {parts[1]}
                </>
            );
        }
        return author;
    };

    return (
        <section id="research" className="py-24 relative overflow-hidden bg-[#050505]">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,10,40,1)_0%,rgba(5,5,5,1)_100%)] opacity-70 pointer-events-none" />
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                        <Microscope className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300">Scholarly Contributions</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Publication</span>
                    </h2>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto italic">
                        "Academic Contributions & Research Work"
                    </p>
                </motion.div>

                {/* Professional Research Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group mx-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Glassmorphic Container */}
                    <div className="relative bg-[#0A0A0B]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-purple-500/30">
                        
                        {/* Title Bar / Header */}
                        <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 border-b border-white/5 px-8 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                                </div>
                                <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">{researchData.domain || "Cybersecurity Research"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-black rounded-md uppercase tracking-tighter">
                                    IEEE Standard
                                </span>
                                <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black rounded-md uppercase">
                                    {researchData.year || "2026"}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Left Content */}
                                <div className="flex-1">
                                    {/* Author Badge */}
                                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                                        <Award className="w-4 h-4 text-green-400" />
                                        <span className="text-xs font-bold text-green-300 uppercase italic">Published Author</span>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all duration-500">
                                        {researchData.title}
                                    </h3>

                                    <div className="flex items-center gap-3 mb-8">
                                        <GraduationCap className="w-6 h-6 text-gray-500" />
                                        <p className="text-xl text-gray-400 font-medium">
                                            Main Author: {formatAuthor(researchData.author)}
                                        </p>
                                    </div>

                                    {/* Expandable Abstract */}
                                    <div className="mb-10 p-6 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/30" />
                                        <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <FileText className="w-4 h-4" /> Abstract
                                        </h4>
                                        <div className="relative">
                                            <p className={`text-gray-300 leading-relaxed text-lg font-light transition-all duration-500 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                                                {researchData.abstract}
                                            </p>
                                            <button 
                                                onClick={() => setIsExpanded(!isExpanded)}
                                                className="mt-3 text-purple-400 font-bold text-sm flex items-center gap-1 hover:text-purple-300 transition-colors uppercase tracking-wider"
                                            >
                                                {isExpanded ? "Collapse Abstract" : "Read Full Abstract"}
                                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Keywords / Tags */}
                                    <div className="mb-10">
                                        <div className="flex flex-wrap gap-2">
                                            {researchData.keywords?.map((tag, idx) => (
                                                <span key={idx} className="px-4 py-2 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:border-purple-500/50 hover:text-white transition-all duration-300 cursor-default">
                                                    [ {tag} ]
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4">
                                        <a 
                                            href={researchData.paperLink}
                                            className="px-8 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        >
                                            <ExternalLink className="w-5 h-5" /> View Paper
                                        </a>
                                        <a 
                                            href={researchData.pdfLink}
                                            className="px-8 py-4 bg-purple-600/20 text-purple-300 border border-purple-500/30 font-black rounded-2xl flex items-center gap-2 hover:bg-purple-600/30 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                                        >
                                            <Download className="w-5 h-5" /> Download PDF
                                        </a>
                                        <a 
                                            href={researchData.githubLink}
                                            className="px-8 py-4 bg-[#111] text-gray-300 border border-white/10 font-black rounded-2xl flex items-center gap-2 hover:bg-black transition-all"
                                        >
                                            <Github className="w-5 h-5" /> View Project
                                        </a>
                                    </div>
                                </div>

                                {/* Right Content: Stats & Citation */}
                                <div className="lg:w-80 flex flex-col gap-8">
                                    {/* Impact Stats */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { label: "Views", val: researchData.impact?.views || "0", icon: Eye, color: "text-blue-400" },
                                            { label: "Downloads", val: researchData.impact?.downloads || "0", icon: Download, color: "text-purple-400" },
                                            { label: "Citations", val: researchData.impact?.citations || "0", icon: TrendingUp, color: "text-green-400" }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/[0.08] transition-all">
                                                <div className={`p-2 bg-black/40 rounded-lg ${stat.color}`}>
                                                    <stat.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                                    <p className="text-xl font-black text-white">{stat.val}+</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Citation Block */}
                                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 relative group/citation">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Users className="w-3 h-3" /> IEEE Citation
                                            </h4>
                                            <button 
                                                onClick={copyToClipboard}
                                                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                                                title="Copy Citation"
                                            >
                                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <div className="p-4 bg-black/60 rounded-xl border border-white/5 font-mono text-[12px] text-gray-400 leading-relaxed italic">
                                            {researchData.citation}
                                        </div>
                                        {copied && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute -top-10 right-0 px-3 py-1 bg-green-500 text-black text-[10px] font-black rounded-md"
                                            >
                                                COPIED TO CLIPBOARD!
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                                        <Globe className="w-3 h-3" /> Globally Recognized Research
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Animated decorative line */}
                        <motion.div 
                            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent w-full"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Simple Globe icon since I added a custom reference
const Globe = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
);

export default ResearchPublication;
