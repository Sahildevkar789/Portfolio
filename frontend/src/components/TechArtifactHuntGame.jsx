import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain, Cloud, Bug, Binary, Lock, Rocket, Target, Zap, Shield, Database, Wifi } from 'lucide-react';
import confetti from 'canvas-confetti';

const ARTIFACT_TYPES = [
    { id: 'chip', name: 'Microchip', icon: Cpu, color: 'text-blue-400' },
    { id: 'brain', name: 'AI Core', icon: Brain, color: 'text-purple-400' },
    { id: 'cloud', name: 'Server', icon: Cloud, color: 'text-sky-400' },
    { id: 'bug', name: 'Bug', icon: Bug, color: 'text-green-400' },
    { id: 'binary', name: 'Binary', icon: Binary, color: 'text-emerald-400' },
    { id: 'lock', name: 'Security', icon: Lock, color: 'text-red-400' },
    { id: 'rocket', name: 'Startup', icon: Rocket, color: 'text-orange-400' },
    { id: 'target', name: 'Target', icon: Target, color: 'text-red-500' },
    { id: 'zap', name: 'Energy', icon: Zap, color: 'text-yellow-400' },
    { id: 'shield', name: 'Firewall', icon: Shield, color: 'text-blue-500' },
    { id: 'db', name: 'Database', icon: Database, color: 'text-indigo-400' },
    { id: 'wifi', name: 'Network', icon: Wifi, color: 'text-cyan-400' },
];

const LEVELS = [
    { level: 1, name: 'Easy', count: 5, size: 'w-10 h-10', opacity: 'opacity-80', hints: 3 },
    { level: 2, name: 'Medium', count: 7, size: 'w-6 h-6', opacity: 'opacity-50', hints: 2 },
    { level: 3, name: 'Hard', count: 10, size: 'w-4 h-4 text-transparent hover:text-current', opacity: 'opacity-30 hover:opacity-100', hints: 1 },
    { level: 4, name: 'Extreme', count: 12, size: 'w-4 h-4', opacity: 'opacity-20 hover:opacity-100', hints: 1, moving: true }
];

const TechArtifactHuntGame = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [artifacts, setArtifacts] = useState([]);
    const [foundObjects, setFoundObjects] = useState([]);
    const [score, setScore] = useState(0);
    const [hintsLeft, setHintsLeft] = useState(3);
    const [isHintActive, setIsHintActive] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [levelComplete, setLevelComplete] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    // Timer ref
    const timerRef = useRef(null);
    const audioContext = useRef(null);

    const initAudio = () => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    const playSuccessSound = () => {
        if (!audioContext.current) return;
        const osc = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioContext.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioContext.current.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
        osc.connect(gainNode);
        gainNode.connect(audioContext.current.destination);
        osc.start();
        osc.stop(audioContext.current.currentTime + 0.1);
    };

    const generateArtifacts = (levelConfig) => {
        const selectedTypes = [...ARTIFACT_TYPES].sort(() => 0.5 - Math.random()).slice(0, levelConfig.count);

        return selectedTypes.map((type, index) => {
            // Using absolute viewport percentages.
            // Since this component is at the bottom of the page,
            // we should render them with absolute positioning relative to the body or main container.
            // But to make it cover everything, we use absolute with a percentage of scrollHeight later,
            // or simply use top/left randomly and absolute to parents.
            return {
                ...type,
                uid: `${type.id}-${Date.now()}-${index}`,
                x: Math.random() * 90 + 5, // 5% to 95%
                y: Math.random() * 90 + 5, // 5% to 95% total height
                movingDelay: Math.random() * 2
            };
        });
    };

    const startGame = (levelIndex = 0) => {
        initAudio();
        const config = LEVELS[levelIndex];
        setCurrentLevel(levelIndex);
        setArtifacts(generateArtifacts(config));
        setFoundObjects([]);
        setHintsLeft(config.hints);
        setGameStarted(true);
        setIsMenuOpen(false);
        setLevelComplete(false);
        setTimeElapsed(0);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
    };

    const handleFound = (artifact) => {
        if (foundObjects.includes(artifact.uid)) return;

        playSuccessSound();
        setFoundObjects(prev => [...prev, artifact.uid]);
        setScore(prev => prev + 50 * (currentLevel + 1));

        // Create small burst of confetti at click location
        // Coordinates need to be passed but we can just use generic confetti
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#a855f7', '#3b82f6', '#ec4899']
        });

        const config = LEVELS[currentLevel];
        if (foundObjects.length + 1 === config.count) {
            clearInterval(timerRef.current);
            setLevelComplete(true);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.5 }
            });
        }
    };

    const useHint = () => {
        if (hintsLeft <= 0 || isHintActive) return;
        setHintsLeft(prev => prev - 1);
        setIsHintActive(true);
        setTimeout(() => {
            setIsHintActive(false);
        }, 3000);
    };

    // Unmount cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const config = LEVELS[currentLevel] || LEVELS[0];

    return (
        <>
            {/* The Hidden Objects Container (Absolute to the whole page) */}
            {gameStarted && !levelComplete && (
                <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden" style={{ height: '100%' }}>
                    {artifacts.map((artifact) => {
                        const isFound = foundObjects.includes(artifact.uid);
                        const Icon = artifact.icon;

                        if (isFound) return null;

                        const movingClass = config.moving ? "animate-[spin_10s_linear_infinite]" : "";

                        return (
                            <motion.div
                                key={artifact.uid}
                                className={`absolute pointer-events-auto cursor-crosshair transition-all duration-300
                                            ${config.opacity} ${config.size} hover:scale-150 z-50 
                                            ${isHintActive ? 'shadow-[0_0_20px_#a855f7] ring-2 ring-purple-500 bg-purple-500/20 rounded-full !opacity-100 !text-current' : ''}`}
                                style={{
                                    left: `${artifact.x}%`,
                                    top: `${artifact.y}%`,
                                }}
                                initial={{ opacity: 0 }}
                                animate={config.moving ? {
                                    x: [0, Math.random() * 100 - 50, 0],
                                    y: [0, Math.random() * 100 - 50, 0],
                                } : { opacity: 1 }}
                                transition={config.moving ? {
                                    repeat: Infinity,
                                    duration: 10,
                                    ease: "linear",
                                    delay: artifact.movingDelay
                                } : { duration: 0.5 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFound(artifact);
                                }}
                            >
                                <Icon className={`w-full h-full ${artifact.color} drop-shadow-lg ${movingClass}`} />
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Game Menu Floating Trigger Button */}
            {!gameStarted && !isMenuOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    onClick={() => setIsMenuOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] text-white hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 group pointer-events-auto"
                >
                    <Target className="w-6 h-6 group-hover:animate-pulse" />
                    <span className="hidden md:inline font-bold">Play Tech Hunt 🚀</span>
                </motion.button>
            )}

            {/* HUD / Floating Panel */}
            {gameStarted && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/20 p-4 px-6 md:px-8 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center gap-4 md:gap-8 pointer-events-auto"
                >
                    <div className="flex items-center gap-4">
                        <div className="text-white">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Tech Explorer ({config.name})</p>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-500" />
                                <span className="font-mono text-xl font-bold">{foundObjects.length} / {config.count}</span>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Score</p>
                            <span className="font-mono text-xl font-bold text-green-400">{score}</span>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-[200px]">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 text-center md:text-left">Progress</p>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                                style={{ width: `${(foundObjects.length / config.count) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                        <button
                            onClick={useHint}
                            disabled={hintsLeft <= 0 || isHintActive || levelComplete}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${hintsLeft > 0
                                ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 border border-purple-500/50'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                }`}
                        >
                            <Brain className="w-4 h-4" /> Hint ({hintsLeft})
                        </button>
                        <button
                            onClick={() => setGameStarted(false)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-full transition-colors"
                            title="Quit Game"
                        >
                            <Target className="w-5 h-5 rotate-45" />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Level Complete / Start Overlays */}
            <AnimatePresence>
                {isMenuOpen && !gameStarted && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
                    >
                        <div className="bg-[#111] border border-purple-500/30 p-8 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 pointer-events-none"></div>

                            <Cpu className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                            <h2 className="text-3xl font-extrabold text-white mb-2">Tech Artifact Hunt</h2>
                            <p className="text-gray-400 mb-8">Find the hidden tech artifacts scattered across the entire portfolio. They might be blended into backgrounds, animations, or corners!</p>

                            <div className="space-y-3">
                                {LEVELS.map((lvl, idx) => (
                                    <button
                                        key={lvl.level}
                                        onClick={() => startGame(idx)}
                                        className="w-full flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:border-purple-500/50 group text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-purple-400 font-bold text-lg">{lvl.level}</span>
                                            <span className="font-bold text-white group-hover:text-purple-300 transition-colors">{lvl.name}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 text-right">
                                            Find {lvl.count} <br /> {lvl.moving ? 'Moving' : 'Static'}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-8 text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                Close Game Menu
                            </button>
                        </div>
                    </motion.div>
                )}

                {levelComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto"
                    >
                        <div
                            className="bg-[#111] border border-green-500/30 p-8 md:p-12 rounded-3xl max-w-md w-full text-center shadow-[0_0_60px_rgba(34,197,94,0.3)] relative overflow-hidden pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                            <Target className="w-20 h-20 text-green-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500 mb-4">Congratulations!</h2>
                            <p className="text-gray-300 font-medium mb-8">You found all the hidden tech artifacts!</p>

                            <button
                                onClick={() => {
                                    setGameStarted(false);
                                    setLevelComplete(false);
                                }}
                                className="pointer-events-auto relative z-50 w-full py-4 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] rounded-xl transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TechArtifactHuntGame;
