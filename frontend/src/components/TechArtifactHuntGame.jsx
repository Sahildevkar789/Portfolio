import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
    {
        level: 1, name: 'Easy',
        count: 4,
        iconSize: 33,        // px
        opacity: 0.9,
        hints: 3,
        moving: false,
        moveDuration: null,
    },
    {
        level: 2, name: 'Medium',
        count: 6,
        iconSize: 28,
        opacity: 0.55,
        hints: 2,
        moving: false,
        moveDuration: null,
    },
    {
        level: 3, name: 'Hard',
        count: 9,
        iconSize: 20,
        opacity: 0.30,
        hints: 1,
        moving: false,
        moveDuration: null,
    },
    {
        level: 4, name: 'Extreme',
        count: 10,
        iconSize: 22,        // slightly bigger than Hard so they're hittable on mobile
        opacity: 0.22,
        hints: 1,
        moving: true,
        moveDuration: 12,    // seconds per loop
    },
];

/* ── Stable random move path per artifact (computed once) ── */
const makeMovePath = () => {
    // Large random offsets so they fly around
    const dx1 = (Math.random() - 0.5) * 60; // ±30vw
    const dy1 = (Math.random() - 0.5) * 60; // ±30vh
    const dx2 = (Math.random() - 0.5) * 60;
    const dy2 = (Math.random() - 0.5) * 60;
    return {
        x: [0, `${dx1}vw`, `${dx2}vw`, 0],
        y: [0, `${dy1}vh`, `${dy2}vh`, 0],
    };
};

const generateArtifacts = (levelConfig) => {
    // Calculate the total height and width of the entire website document
    const pageW = document.documentElement.scrollWidth;
    const pageH = document.documentElement.scrollHeight;

    // Safety margins to ensure they stay strictly within the layout without causing scrollbars
    const minX = 40;
    const maxX = Math.max(pageW - 80, minX);
    const minY = 100;
    const maxY = Math.max(pageH - 250, minY);

    const pool = [...ARTIFACT_TYPES].sort(() => 0.5 - Math.random()).slice(0, levelConfig.count);
    return pool.map((type, i) => ({
        ...type,
        uid: `${type.id}-${Date.now()}-${i}`,
        xPx: minX + Math.random() * (maxX - minX),
        yPx: minY + Math.random() * (maxY - minY),
        movePath: levelConfig.moving ? makeMovePath() : null,
        moveDelay: Math.random() * 2,
        moveDuration: levelConfig.moveDuration
            ? levelConfig.moveDuration * (0.8 + Math.random() * 0.4)
            : null,
    }));
};

/* ── Single artifact rendered inside the game area ── */
const ArtifactItem = ({ artifact, config, isFound, isHintActive, onFound }) => {
    const Icon = artifact.icon;
    const size = config.iconSize;

    // Touch/click handler — unified
    const handleInteraction = useCallback((e) => {
        e.stopPropagation();
        onFound(artifact);
    }, [artifact, onFound]);

    if (isFound) return null;

    const hintStyle = isHintActive
        ? { opacity: 1, boxShadow: '0 0 0 2px #a855f7, 0 0 16px #a855f7' }
        : {};

    const motionProps = artifact.movePath
        ? {
            animate: artifact.movePath,
            transition: {
                repeat: Infinity,
                duration: artifact.moveDuration,
                ease: 'easeInOut',
                delay: artifact.moveDelay,
            },
        }
        : {
            animate: { opacity: config.opacity },
            initial: { opacity: 0 },
            transition: { duration: 0.6 },
        };

    return (
        <motion.div
            key={artifact.uid}
            {...motionProps}
            onClick={handleInteraction}
            onTouchEnd={handleInteraction}
            className="absolute cursor-crosshair z-50 hover:scale-150 active:scale-150
                       transition-transform duration-150 touch-none select-none pointer-events-auto"
            style={{
                left: artifact.xPx,
                top: artifact.yPx,
                width: size,
                height: size,
                opacity: isHintActive ? 1 : config.opacity,
                transform: 'translate(-50%, -50%)',
                // make touch hitbox bigger on mobile without changing visuals
                padding: 8,
                margin: -8,
                ...hintStyle,
            }}
        >
            <Icon
                style={{ width: size, height: size }}
                className={`${artifact.color} drop-shadow-lg`}
            />
        </motion.div>
    );
};

/* ──────────────────────────────────────────────────
   Main Component
────────────────────────────────────────────────── */
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

    const timerRef = useRef(null);
    const audioCtxRef = useRef(null);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    const playBeep = (freq = 800) => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    };

    const startGame = (levelIndex = 0) => {
        initAudio();
        const cfg = LEVELS[levelIndex];
        setCurrentLevel(levelIndex);
        setArtifacts(generateArtifacts(cfg));
        setFoundObjects([]);
        setHintsLeft(cfg.hints);
        setScore(prev => prev); // keep cumulative score
        setGameStarted(true);
        setIsMenuOpen(false);
        setLevelComplete(false);
        setTimeElapsed(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setTimeElapsed(p => p + 1), 1000);
    };

    const resetAll = () => {
        clearInterval(timerRef.current);
        setGameStarted(false);
        setLevelComplete(false);
        setIsMenuOpen(false);
        setScore(0);
        setArtifacts([]);
        setFoundObjects([]);
    };

    const handleFound = useCallback((artifact) => {
        setFoundObjects(prev => {
            if (prev.includes(artifact.uid)) return prev;
            playBeep();
            confetti({ particleCount: 25, spread: 45, origin: { y: 0.7 }, colors: ['#a855f7', '#3b82f6', '#ec4899'] });

            const next = [...prev, artifact.uid];
            const cfg = LEVELS[currentLevel];

            setScore(s => s + 50 * (currentLevel + 1));

            if (next.length === cfg.count) {
                clearInterval(timerRef.current);
                setLevelComplete(true);
                setTimeout(() => confetti({ particleCount: 180, spread: 110, origin: { y: 0.4 } }), 100);
            }
            return next;
        });
    }, [currentLevel]);

    const useHint = () => {
        if (hintsLeft <= 0 || isHintActive) return;
        setHintsLeft(p => p - 1);
        setIsHintActive(true);
        setTimeout(() => setIsHintActive(false), 3000);
    };

    useEffect(() => () => clearInterval(timerRef.current), []);

    const cfg = LEVELS[currentLevel] || LEVELS[0];
    const progress = artifacts.length > 0 ? foundObjects.length / cfg.count : 0;
    const timeStr = `${String(Math.floor(timeElapsed / 60)).padStart(2, '0')}:${String(timeElapsed % 60).padStart(2, '0')}`;

    return (
        <>
            {/* ── Hidden artifact layer (portaled to document body so it spans the entire website) ── */}
            {gameStarted && !levelComplete && createPortal(
                <div
                    className="absolute inset-0 z-40 overflow-visible pointer-events-none"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'visible' }}
                >
                    {artifacts.map(artifact => (
                        <ArtifactItem
                            key={artifact.uid}
                            artifact={artifact}
                            config={cfg}
                            isFound={foundObjects.includes(artifact.uid)}
                            isHintActive={isHintActive}
                            onFound={handleFound}
                        />
                    ))}
                </div>,
                document.body
            )}

            {/* ── Launch Button (when not playing) ── */}
            {!gameStarted && !isMenuOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(true)}
                    className="fixed bottom-5 right-4 z-50 flex items-center gap-2 px-4 py-3
                        bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full text-white font-bold
                        shadow-[0_0_28px_rgba(168,85,247,0.5)] hover:shadow-[0_0_44px_rgba(59,130,246,0.6)]
                        transition-shadow text-sm md:text-base pointer-events-auto"
                >
                    <Target className="w-5 h-5 flex-shrink-0" />
                    <span>Play Tech Hunt 🚀</span>
                </motion.button>
            )}

            {/* ── In-game HUD ── */}
            {gameStarted && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[100] w-[96%] max-w-xl
                        bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/15 rounded-2xl
                        shadow-[0_16px_48px_rgba(0,0,0,0.8)] pointer-events-auto"
                >
                    {/* Progress bar */}
                    <div className="h-1 w-full rounded-t-2xl overflow-hidden bg-white/5">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                            animate={{ width: `${progress * 100}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    <div className="p-3 px-4 flex flex-wrap items-center gap-3">
                        {/* Level */}
                        <div className="flex flex-col min-w-[60px]">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Level</span>
                            <span className="font-bold text-white text-sm">{cfg.name}</span>
                        </div>

                        {/* Found counter */}
                        <div className="flex flex-col min-w-[60px]">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Found</span>
                            <div className="flex items-center gap-1">
                                <Target className="w-3 h-3 text-purple-400" />
                                <span className="font-mono font-bold text-white text-sm">
                                    {foundObjects.length} / {cfg.count}
                                </span>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="flex flex-col min-w-[50px]">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Score</span>
                            <span className="font-mono font-bold text-green-400 text-sm">{score}</span>
                        </div>

                        {/* Time */}
                        <div className="flex flex-col min-w-[48px]">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Time</span>
                            <span className="font-mono text-gray-300 text-sm">{timeStr}</span>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Hint */}
                        <button
                            onClick={useHint}
                            disabled={hintsLeft <= 0 || isHintActive}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                                transition-colors border ${hintsLeft > 0 && !isHintActive
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/40 active:scale-95'
                                    : 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed'}`}
                        >
                            <Brain className="w-3.5 h-3.5" />
                            {isHintActive ? 'Active!' : `Hint (${hintsLeft})`}
                        </button>

                        {/* Quit */}
                        <button
                            onClick={resetAll}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 active:scale-95
                                border border-red-500/30 text-red-400 rounded-full transition-colors"
                            title="Quit Game"
                        >
                            <Target className="w-4 h-4 rotate-45" />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* ── Overlays ── */}
            <AnimatePresence>

                {/* Level select menu */}
                {isMenuOpen && !gameStarted && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-[#111] border border-purple-500/30 p-6 md:p-8 rounded-3xl
                                max-w-md w-full text-center relative overflow-hidden
                                shadow-[0_0_60px_rgba(168,85,247,0.3)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/15 to-blue-500/15 pointer-events-none" />
                            <Cpu className="w-14 h-14 text-purple-400 mx-auto mb-4" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Tech Artifact Hunt</h2>
                            <p className="text-gray-400 text-sm mb-6">
                                Find hidden tech icons scattered across the page. They blend into the background — use Hint if stuck!
                            </p>

                            <div className="space-y-2.5 mb-6">
                                {LEVELS.map((lvl, idx) => (
                                    <button
                                        key={lvl.level}
                                        onClick={() => startGame(idx)}
                                        className="w-full flex justify-between items-center p-4 bg-white/5
                                            hover:bg-white/10 active:bg-white/15
                                            border border-white/10 rounded-xl transition-all
                                            hover:border-purple-500/50 group text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-purple-400 font-black text-lg w-6">{lvl.level}</span>
                                            <div>
                                                <p className="font-bold text-white group-hover:text-purple-300 transition-colors">{lvl.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {lvl.count} items • {lvl.moving ? '🔴 Moving' : '🟢 Static'} • {lvl.hints} hint{lvl.hints !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {[1, 1, 1, 1].map((_, i) => (
                                                <span key={i} className={`inline-block w-2 h-2 rounded-full mx-0.5 ${i < lvl.level ? 'bg-purple-500' : 'bg-gray-700'}`} />
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Level complete */}
                {levelComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto"
                    >
                        <div className="bg-[#111] border border-green-500/30 p-7 md:p-10 rounded-3xl
                            max-w-sm w-full text-center shadow-[0_0_60px_rgba(34,197,94,0.3)]
                            relative overflow-hidden pointer-events-auto">
                            <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />

                            <Target className="w-16 h-16 text-green-400 mx-auto mb-4 drop-shadow-[0_0_12px_rgba(74,222,128,0.5)]" />
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500 mb-2">
                                Level Clear!
                            </h2>
                            <p className="text-gray-400 text-sm mb-2">All artifacts found in <span className="text-white font-bold">{timeStr}</span></p>
                            <p className="text-green-400 font-mono font-black text-3xl mb-6">{score} pts</p>

                            <div className="flex flex-col gap-3">
                                {currentLevel < LEVELS.length - 1 && (
                                    <button
                                        onClick={() => startGame(currentLevel + 1)}
                                        className="w-full py-3 text-sm font-bold text-white
                                            bg-gradient-to-r from-purple-600 to-blue-600
                                            hover:from-purple-500 hover:to-blue-500
                                            active:scale-95 rounded-xl transition-all
                                            shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                                    >
                                        Next Level →
                                    </button>
                                )}
                                <button
                                    onClick={() => { setIsMenuOpen(true); setLevelComplete(false); setGameStarted(false); }}
                                    className="w-full py-3 text-sm font-bold text-white bg-white/10
                                        hover:bg-white/20 active:scale-95 border border-white/10 rounded-xl transition-all"
                                >
                                    Play Again
                                </button>
                                <button
                                    onClick={resetAll}
                                    className="text-xs text-gray-500 hover:text-white transition-colors mt-1"
                                >
                                    Exit Game
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TechArtifactHuntGame;
