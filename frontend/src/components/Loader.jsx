import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Loader = () => {
    const [progress, setProgress] = useState(0);

    // Simulate progress bar filling up over 1.8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Takes about 5 seconds to reach 100 at an average of 2% per 100ms
                return prev + Math.floor(Math.random() * 3) + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
            {/* Ambient animated background glows */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"
                />
            </div>

            <div className="z-10 flex flex-col items-center max-w-sm w-full px-6">
                
                {/* Glowing Spinner / Logo Area */}
                <div className="relative flex items-center justify-center w-24 h-24 mb-8">
                    {/* Rotating dashed ring */}
                    <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full text-purple-500/30"
                        viewBox="0 0 100 100"
                    >
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    </motion.svg>
                    
                    {/* Fast rotating solid ring arc */}
                    <motion.svg
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full text-blue-500"
                        viewBox="0 0 100 100"
                    >
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="300" strokeDashoffset="240" strokeLinecap="round" />
                    </motion.svg>

                    {/* Inner Icon */}
                    <motion.div
                        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4 rounded-full border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                    >
                        <Terminal className="w-8 h-8 text-white" />
                    </motion.div>
                </div>

                {/* Text Content */}
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight"
                >
                    Sahil Devkar
                </motion.h1>

                <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-purple-400 text-sm font-mono font-bold uppercase tracking-[0.2em] mb-8 relative"
                >
                    Initializing Portfolio...
                </motion.div>

                {/* Progress Bar Container */}
                <div className="w-full relative">
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider mb-2">
                        <span>Loading AI-Powered Experience</span>
                        <span className="text-blue-400 w-8 text-right">{Math.min(progress, 100)}%</span>
                    </div>
                    
                    {/* The Track */}
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm relative">
                        {/* The Fill */}
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ ease: "easeOut", duration: 0.2 }}
                        >
                            {/* Moving shine on the bar */}
                            <motion.div 
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
