import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Layout, Server, Terminal, Cpu, Globe, Boxes } from 'lucide-react';

const SKILLS = [
  { id: 'react', name: 'React', icon: Layout, desc: 'Building dynamic and responsive user interfaces with modern React features.', color: 'text-blue-400', shadow: 'shadow-blue-500/50' },
  { id: 'node', name: 'Node.js', icon: Server, desc: 'Developing scalable backend systems and RESTful APIs.', color: 'text-green-500', shadow: 'shadow-green-500/50' },
  { id: 'js', name: 'JavaScript', icon: Code2, desc: 'My primary language for building full-stack applications.', color: 'text-yellow-400', shadow: 'shadow-yellow-400/50' },
  { id: 'python', name: 'Python', icon: Terminal, desc: 'Used for scripting, data processing, and automation tasks.', color: 'text-blue-500', shadow: 'shadow-blue-500/50' },
  { id: 'db', name: 'Database', icon: Database, desc: 'Designing robust data constraints in MongoDB & PostgreSQL.', color: 'text-emerald-500', shadow: 'shadow-emerald-500/50' },
  { id: 'api', name: 'APIs', icon: Globe, desc: 'Connecting diverse services with performant REST & GraphQL APIs.', color: 'text-purple-400', shadow: 'shadow-purple-400/50' },
  { id: 'docker', name: 'Docker', icon: Boxes, desc: 'Containerizing applications for consistent deployment.', color: 'text-cyan-500', shadow: 'shadow-cyan-500/50' },
  { id: 'sys', name: 'System Design', icon: Cpu, desc: 'Architecting maintainable and cost-effective digital solutions.', color: 'text-red-400', shadow: 'shadow-red-400/50' },
];

const FloatingSkill = ({ skill, onClick, isActive }) => {
  // Random starting position and movement delta based on screen
  const [position, setPosition] = useState({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  });

  useEffect(() => {
    if (isActive) return;
    const interval = setInterval(() => {
      setPosition((prev) => ({
        x: Math.max(5, Math.min(85, prev.x + (Math.random() * 15 - 7.5))),
        y: Math.max(5, Math.min(85, prev.y + (Math.random() * 15 - 7.5))),
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [isActive]);

  const Icon = skill.icon;

  return (
    <motion.div
      className={`absolute cursor-pointer p-4 rounded-full glass border border-white/10 backdrop-blur-md transition-all duration-300 ${isActive ? 'scale-125 z-50 ring-2 ring-primary-500 shadow-[0_0_30px_rgba(168,85,247,0.6)]' : `hover:scale-110 hover:z-40 shadow-lg ${skill.shadow}`}`}
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      transition={{ type: 'spring', damping: 15, stiffness: 30 }}
      onClick={() => onClick(skill)}
    >
      <Icon className={`w-8 h-8 md:w-10 md:h-10 ${skill.color}`} />
    </motion.div>
  );
};

const InteractivePlayground = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  // Close active skill on click outside play area wrapper
  return (
    <section className="relative min-h-screen py-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#050505] border-t border-white/5" onClick={() => setActiveSkill(null)}>
      {/* Animated Deep Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Particles effect overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <div className="z-10 text-center mb-8 max-w-2xl px-4">
        <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
        >
          Interactive Zone
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
        >
          Catch the floating skills to explore my technical stack!
        </motion.p>
      </div>

      <div 
        className="relative w-full max-w-5xl h-[60vh] md:h-[65vh] rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-crosshair"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Play Area */}
        {SKILLS.map((skill) => (
          <FloatingSkill
            key={skill.id}
            skill={skill}
            isActive={activeSkill?.id === skill.id}
            onClick={setActiveSkill}
          />
        ))}

        {/* Skill Details Overlay */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-auto min-w-[300px] max-w-md bg-[#111]/90 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 text-center"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveSkill(null); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                ✕
              </button>
              <div className="flex flex-col items-center">
                <activeSkill.icon className={`w-14 h-14 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ${activeSkill.color}`} />
                <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">{activeSkill.name}</h3>
                <p className="text-gray-300 shadow-sm leading-relaxed text-lg">{activeSkill.desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractivePlayground;
