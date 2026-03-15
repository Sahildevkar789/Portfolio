import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalSquare, Maximize2, X, Minus } from 'lucide-react';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'SahilOS v1.0.0 (tty1)' },
        { type: 'system', content: 'Type "help" to see available commands.' }
    ]);
    const endOfTerminalRef = useRef(null);

    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let response = '';

            switch (cmd) {
                case 'help':
                    response = 'Available commands:\\n- about\\n- skills\\n- projects\\n- contact\\n- clear';
                    break;
                case 'about':
                    response = 'B.Tech Computer Engineering student who loves building full-stack web apps and cloud architectures.';
                    break;
                case 'skills':
                    response = 'JavaScript, Python, Java, C, React, Node.js, Express, MongoDB, Git, Linux.';
                    break;
                case 'projects':
                    response = '1. Sports Turf Booking\\n2. Airbnb Clone\\n3. BharatMeet\\nType "view portfolio" from the GUI to see more detail.';
                    break;
                case 'contact':
                    response = 'Email: your-email@example.com \\nLinkedIn: linkedin.com/in/sahildevkar \\nGitHub: github.com/sahildevkar';
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case '':
                    response = '';
                    break;
                default:
                    response = `command not found: ${cmd}`;
            }

            setHistory(prev => [
                ...prev,
                { type: 'user', content: `C:\\Users\\Guest> ${input}` },
                ...(response ? [{ type: 'system', content: response }] : [])
            ]);
            setInput('');
        }
    };

    return (
        <section className="py-20 px-4 bg-gray-50/50 dark:bg-black/50">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <TerminalSquare className="text-primary-500 w-8 h-8" />
                        Interactive <span className="text-primary-500">Terminal</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">For the developers who prefer the command line.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800 font-mono"
                >
                    {/* Terminal Header */}
                    <div className="bg-[#323233] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="text-gray-400 text-xs">cmd.exe - SahilOS</div>
                        <div className="flex gap-2">
                            <Minus className="w-4 h-4 text-gray-400" />
                            <Maximize2 className="w-4 h-4 text-gray-400" />
                            <X className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 h-80 overflow-y-auto text-green-400 text-sm md:text-base">
                        {history.map((line, i) => (
                            <div key={i} className="mb-2">
                                {line.content.split('\\n').map((str, index) => (
                                    <div key={index} className={line.type === 'user' ? 'text-white' : 'text-green-400'}>
                                        {str}
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="flex items-center mt-2">
                            <span className="text-white mr-2">C:\Users\Guest&gt;</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                className="flex-1 bg-transparent border-none outline-none text-white caret-gray-300"
                                autoFocus
                            />
                        </div>
                        <div ref={endOfTerminalRef}></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Terminal;
