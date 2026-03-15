import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Zap, Skull, ShieldAlert, Crosshair, Play, RotateCcw } from 'lucide-react';

const BUG_TYPES = [
    { id: 'syntax', name: 'SyntaxError', icon: Bug, color: 'text-red-400', glow: 'shadow-red-500/50', points: 10, speed: 3000 },
    { id: '404', name: '404 Bug', icon: Skull, color: 'text-purple-400', glow: 'shadow-purple-500/50', points: 15, speed: 2500 },
    { id: 'null', name: 'NullPointer', icon: ShieldAlert, color: 'text-yellow-400', glow: 'shadow-yellow-500/50', points: 20, speed: 2000 },
    { id: 'memory', name: 'MemoryLeak', icon: Zap, color: 'text-blue-400', glow: 'shadow-blue-500/50', points: 25, speed: 1500 }
];

const GAME_DURATION = 30; // seconds
const SPAWN_INTERVAL = 800; // ms between bugs

const BugHunterGame = () => {
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameover'
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [bugs, setBugs] = useState([]);
    const [clicks, setClicks] = useState([]);
    
    // Audio refs (using simple browser beeps via AudioContext if no files, or optional paths)
    const audioContext = useRef(null);

    // Initialize Audio Context on user interaction to avoid browser warnings
    const initAudio = () => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    const playSquashSound = () => {
        if (!audioContext.current) return;
        const osc = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, audioContext.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioContext.current.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
        osc.connect(gainNode);
        gainNode.connect(audioContext.current.destination);
        osc.start();
        osc.stop(audioContext.current.currentTime + 0.1);
    };

    // Game Loop routines
    const startGame = () => {
        initAudio();
        setGameState('playing');
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setBugs([]);
        setClicks([]);
    };

    const spawnBug = useCallback(() => {
        const randomBugType = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
        
        // Ensure bugs spawn fully inside the container boundaries
        const newBug = {
            id: Date.now() + Math.random(),
            type: randomBugType,
            x: Math.random() * 80 + 10, // 10% to 90%
            y: Math.random() * 80 + 10,
        };

        setBugs(prev => [...prev, newBug]);

        // Auto remove bug if totally missed after its "speed" duration
        setTimeout(() => {
            setBugs(prev => prev.filter(b => b.id !== newBug.id));
        }, randomBugType.speed);

    }, []);

    // Timer and Spawning mechanisms
    useEffect(() => {
        if (gameState !== 'playing') return;

        // Timer
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('gameover');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Bug Spawner
        const spawner = setInterval(spawnBug, SPAWN_INTERVAL);

        return () => {
            clearInterval(timer);
            clearInterval(spawner);
        };
    }, [gameState, spawnBug]);

    const handleBugClick = (e, bug) => {
        e.stopPropagation();
        
        // Visual Hit Effect Coordinates
        const rect = e.target.getBoundingClientRect();
        
        playSquashSound();
        setScore(prev => prev + bug.type.points);
        setBugs(prev => prev.filter(b => b.id !== bug.id));

        // Add Floating Points Text
        const newClick = {
            id: Date.now(),
            x: bug.x,
            y: bug.y,
            points: bug.type.points
        };
        setClicks(prev => [...prev, newClick]);

        // Remove points text quickly
        setTimeout(() => {
            setClicks(prev => prev.filter(c => c.id !== newClick.id));
        }, 800);
    };

    return (
        <section className="relative min-h-[80vh] py-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#050505] border-t border-white/5 font-sans">
            {/* Ambient Backgrounds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
            </div>
            
            <div className="z-10 text-center mb-8 max-w-2xl px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-500 to-blue-500 flex items-center justify-center gap-3">
                    <Crosshair className="w-8 h-8 md:w-10 md:h-10 text-red-500" /> Bug Hunter
                </h2>
                <p className="text-gray-400 text-lg">
                    Squash the nasty production bugs before they crash the server!
                </p>
            </div>

            {/* Main Game Container */}
            <div className="relative w-full max-w-4xl h-[60vh] md:h-[65vh] rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                
                {/* Game Header (Score and Timer) */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 pointer-events-none">
                    <div className="bg-[#111]/80 backdrop-blur border border-white/10 px-6 py-2 rounded-full font-mono text-xl md:text-2xl font-bold tracking-wider text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                        SCORE: {score.toString().padStart(4, '0')}
                    </div>
                    <div className="flex items-center gap-2 bg-[#111]/80 backdrop-blur border border-white/10 px-4 md:px-6 py-2 rounded-full font-mono text-xl md:text-2xl font-bold tracking-wider text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.2)]">
                        <span className="hidden md:inline">TIME: </span>00:{timeLeft.toString().padStart(2, '0')}
                    </div>
                </div>

                {/* GAME STATES */}
                <AnimatePresence>
                    
                    {/* START SCREEN */}
                    {gameState === 'start' && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30 p-4"
                        >
                            <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-purple-500/30 text-center shadow-[0_0_60px_rgba(168,85,247,0.2)] max-w-md w-full">
                                <Bug className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-2">Ready to Hunt?</h3>
                                <p className="text-gray-400 mb-8">Click the bugs to eliminate them. Different bugs yield different points. You have 30 seconds.</p>
                                <button 
                                    onClick={startGame}
                                    className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                    <span className="relative flex items-center gap-2">
                                        <Play className="w-5 h-5 fill-current" /> START GAME
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* PLAYING SCREEN: The Bugs */}
                    {gameState === 'playing' && (
                        <div className="absolute inset-0 z-10 cursor-crosshair">
                            {bugs.map((bug) => {
                                const BugIcon = bug.type.icon;
                                return (
                                    <motion.div
                                        key={bug.id}
                                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                                        className={`absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-125`}
                                        style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                                        onMouseDown={(e) => handleBugClick(e, bug)}
                                    >
                                        <div className={`p-3 md:p-4 rounded-full bg-[#111] border border-white/20 glass ${bug.type.glow} cursor-pointer`}>
                                            <BugIcon className={`w-8 h-8 md:w-10 md:h-10 ${bug.type.color}`} />
                                        </div>
                                        <span className={`text-[10px] md:text-xs font-bold mt-2 px-2 py-0.5 rounded backdrop-blur border border-white/10 ${bug.type.color} bg-black/50`}>
                                            {bug.type.name}
                                        </span>
                                    </motion.div>
                                );
                            })}

                            {/* Floating Points (Clicks) */}
                            {clicks.map(click => (
                                <motion.div
                                    key={click.id}
                                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                                    animate={{ opacity: 0, y: -50, scale: 1.5 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute font-black text-xl md:text-2xl text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: `${click.x}%`, top: `${click.y}%` }}
                                >
                                    +{click.points}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* GAME OVER SCREEN */}
                    {gameState === 'gameover' && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30 p-4"
                        >
                            <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-white/10 text-center shadow-[0_0_60px_rgba(0,0,0,0.8)] max-w-md w-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none"></div>
                                
                                <h3 className="text-4xl font-extrabold text-white mb-2 tracking-tight">GAME OVER</h3>
                                <p className="text-gray-400 mb-6 font-medium">Bugs Squashed! Here is your result:</p>
                                
                                <div className="bg-black/50 border border-white/5 rounded-2xl p-6 mb-8">
                                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Final Score</p>
                                    <p className="text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                                        {score}
                                    </p>
                                </div>

                                <button 
                                    onClick={startGame}
                                    className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300"
                                >
                                    <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" /> PLAY AGAIN
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default BugHunterGame;
