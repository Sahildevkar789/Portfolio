import React, { useState } from 'react';
import { 
    TerminalSquare, Heart, Github, Linkedin, Mail, 
    ArrowUpRight, Bug, Lightbulb, MessageSquare 
} from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const Footer = () => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState('Improvement');

    const openFeedback = (type) => {
        setFeedbackType(type);
        setIsFeedbackOpen(true);
    };

    return (
        <footer className="relative bg-[#050505] pt-16 pb-8 border-t border-white/10 overflow-hidden">
            <FeedbackModal 
                isOpen={isFeedbackOpen} 
                onClose={() => setIsFeedbackOpen(false)} 
                initialType={feedbackType} 
            />
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-32 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    
                    {/* Column 1: Brand */}
                    <div className="lg:col-span-1">
                        <a href="#home" className="flex items-center gap-2 group mb-6 w-fit">
                            <TerminalSquare className="w-8 h-8 text-purple-500 group-hover:text-blue-400 transition-colors" />
                            <span className="text-2xl font-black tracking-tighter text-white">
                                Sahil<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">.dev</span>
                            </span>
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6 font-medium">
                            A passionate Full-Stack Developer creating modern, high-performance web applications.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/Sahil-Devkar" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-xl transition-all hover:border-purple-500/50 group">
                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="https://linkedin.com/in/Sahil-Devkar" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-blue-400 border border-white/10 rounded-xl transition-all hover:border-blue-500/50 group">
                                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="mailto:sahildevkar789@gmail.com" className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-red-400 border border-white/10 rounded-xl transition-all hover:border-red-500/50 group">
                                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 px-1 border-l-2 border-purple-500">Navigation</h3>
                        <ul className="flex flex-col gap-3">
                            {['Home', 'About', 'Skills', 'Projects'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group w-fit">
                                        <ArrowUpRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Explore */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 px-1 border-l-2 border-blue-500">Explore</h3>
                        <ul className="flex flex-col gap-3">
                            {['Certifications', 'Research', 'Contact', 'Terminal'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group w-fit">
                                        <ArrowUpRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="/admin/login" className="text-gray-500 hover:text-purple-400 text-sm font-bold transition-colors flex items-center gap-1 group w-fit mt-2">
                                    Admin Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Feedback & Support */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 px-1 border-l-2 border-green-500">Community</h3>
                        <ul className="flex flex-col gap-4">
                           <li>
                                <button onClick={() => openFeedback('Improvement')} className="flex items-start gap-3 group text-left">
                                    <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                                        <Lightbulb className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-200 group-hover:text-amber-400 transition-colors">Suggest Improvement</span>
                                        <span className="text-[10px] text-gray-500">Help me get better</span>
                                    </div>
                                </button>
                           </li>
                           <li>
                                <button onClick={() => openFeedback('Bug')} className="flex items-start gap-3 group text-left">
                                    <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                                        <Bug className="w-4 h-4 text-red-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-200 group-hover:text-red-400 transition-colors">Report a Bug</span>
                                        <span className="text-[10px] text-gray-500">Found a glitch?</span>
                                    </div>
                                </button>
                           </li>
                           <li>
                                <button onClick={() => openFeedback('Support')} className="flex items-start gap-3 group text-left">
                                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                        <MessageSquare className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors">Get Support</span>
                                        <span className="text-[10px] text-gray-500">Direct message</span>
                                    </div>
                                </button>
                           </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm font-medium text-center md:text-left">
                        &copy; {new Date().getFullYear()} Sahil Santosh Devkar. All rights reserved.
                    </p>
                    
                    <p className="text-gray-500 text-sm font-medium flex items-center gap-1.5 bg-white/5 py-1.5 px-3 rounded-full border border-white/5">
                        Built with 
                        <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500 animate-pulse" /> 
                        using <span className="text-gray-300 font-bold">React & Tailwind</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
