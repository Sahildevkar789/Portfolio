import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Globe, Shield, Wrench, Lightbulb, LayoutGrid,
  ShieldAlert, Network, Bug, Search, Cpu, Cloud, Lock, Box,
} from 'lucide-react';

/* ─────────────────────────────────────────
   DEVICON CDN  →  real brand SVG logos
   Format: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{key}/{key}-original.svg
   For coloured logos use "-original", plain use "-plain"
───────────────────────────────────────── */
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const deviconMap = {
  // Programming
  python:         `${DEVICON_BASE}/python/python-original.svg`,
  javascript:     `${DEVICON_BASE}/javascript/javascript-original.svg`,
  java:           `${DEVICON_BASE}/java/java-original.svg`,
  c:              `${DEVICON_BASE}/c/c-original.svg`,
  // Web
  react:          `${DEVICON_BASE}/react/react-original.svg`,
  'node.js':      `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  express:        `${DEVICON_BASE}/express/express-original.svg`,
  mongodb:        `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  html:           `${DEVICON_BASE}/html5/html5-original.svg`,
  css:            `${DEVICON_BASE}/css3/css3-original.svg`,
  // Tools
  git:            `${DEVICON_BASE}/git/git-original.svg`,
  github:         `${DEVICON_BASE}/github/github-original.svg`,
  docker:         `${DEVICON_BASE}/docker/docker-original.svg`,
  linux:          `${DEVICON_BASE}/linux/linux-original.svg`,
  postman:        `${DEVICON_BASE}/postman/postman-original.svg`,
  'vs code':      `${DEVICON_BASE}/vscode/vscode-original.svg`,
};

// Lucide fallback icons for skills without a devicon brand logo
const lucideFallback = {
  'web security':     <ShieldAlert size={20} className="text-rose-400" />,
  'network security': <Network size={20} className="text-blue-400" />,
  'ethical hacking':  <Bug size={20} className="text-amber-400" />,
  'pen testing':      <Search size={20} className="text-purple-400" />,
  'rest apis':        <Globe size={20} className="text-cyan-400" />,
  'data structures':  <Cpu size={20} className="text-green-400" />,
  'cloud computing':  <Cloud size={20} className="text-sky-400" />,
  cybersecurity:      <Lock size={20} className="text-rose-400" />,
};

/* Renders either a real brand <img> or a coloured Lucide icon */
const SkillIcon = ({ name }) => {
  const key = name?.toLowerCase();
  const src = deviconMap[key];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-8 h-8 object-contain drop-shadow-sm"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  }

  return lucideFallback[key] || <Box size={20} className="text-gray-400" />;
};

/* ─────────────── Category Tab Config ─────────────── */
const TABS = [
  { key: 'all',             label: 'All Skills',    icon: <LayoutGrid size={15} /> },
  { key: 'Programming',     label: 'Programming',   icon: <Code2 size={15} /> },
  { key: 'Web Development', label: 'Web Dev',       icon: <Globe size={15} /> },
  { key: 'Cybersecurity',   label: 'Cybersecurity', icon: <Shield size={15} /> },
  { key: 'Tools',           label: 'Tools',         icon: <Wrench size={15} /> },
  { key: 'Concepts',        label: 'Concepts',      icon: <Lightbulb size={15} /> },
];

/* ─────────────── Level Badge ─────────────── */
const levelConfig = {
  advanced:     { label: 'Advanced',     color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  intermediate: { label: 'Intermediate', color: 'bg-amber-500/20  text-amber-400  border-amber-500/30'  },
  beginner:     { label: 'Beginner',     color: 'bg-rose-500/20   text-rose-400   border-rose-500/30'   },
};

const getLevelKey = (level) => {
  if (level >= 75) return 'advanced';
  if (level >= 40) return 'intermediate';
  return 'beginner';
};

/* ─────────────── Skill Card ─────────────── */
const cardVariants = {
  hidden:  { opacity: 0, scale: 0.85, y: 16 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.04, ease: 'easeOut' },
  }),
  exit:    { opacity: 0, scale: 0.85, y: -10, transition: { duration: 0.2 } },
};

const SkillCard = ({ skill, index }) => {
  const levelKey = getLevelKey(skill.level);
  const { label, color } = levelConfig[levelKey];

  return (
    <motion.div
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.07, y: -5 }}
      className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl cursor-default
        bg-white/5 border border-white/10
        hover:border-purple-500/50 hover:bg-purple-500/5
        hover:shadow-[0_0_22px_rgba(139,92,246,0.18)]
        transition-colors duration-300"
    >
      {/* hover shimmer */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        transition-opacity duration-300 pointer-events-none
        bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10" />

      {/* Icon container */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl
        bg-white/5 border border-white/10
        group-hover:border-purple-500/30 group-hover:bg-white/10
        transition-all duration-300">
        <SkillIcon name={skill.name} />
      </div>

      {/* Name */}
      <span className="text-sm font-semibold text-gray-200 text-center leading-tight">
        {skill.name}
      </span>

      {/* Level badge */}
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
        {label}
      </span>
    </motion.div>
  );
};

/* ─────────────── Floating Orbs ─────────────── */
const FloatingOrb = ({ className }) => (
  <motion.div
    animate={{ y: [0, -18, 0], opacity: [0.25, 0.5, 0.25] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
  />
);

/* ─────────────── Main Component ─────────────── */
const Skills = () => {
  const [skills, setSkills]   = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/skills`
        );
        setSkills(data);
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };
    fetchSkills();
  }, []);

  const visibleSkills =
    activeTab === 'all'
      ? skills
      : skills.filter((s) => s.category === activeTab);

  const availableTabs = TABS.filter(
    (t) => t.key === 'all' || skills.some((s) => s.category === t.key)
  );

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden bg-[#0a0a0f]">
      <FloatingOrb className="w-80 h-80 bg-purple-600/20 -top-24 -left-24" />
      <FloatingOrb className="w-96 h-96 bg-blue-600/10 top-1/2 -right-36" />

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase
              bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4"
          >
            ⚡ My Arsenal
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Technical{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            A curated collection of technologies I've mastered — from systems programming to cloud security.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-purple-500" />
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <div className="h-px w-14 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {availableTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = tab.key === 'all'
              ? skills.length
              : skills.filter((s) => s.category === tab.key).length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                  transition-all duration-300 border outline-none
                  ${isActive
                    ? 'bg-purple-600/20 border-purple-500/60 text-purple-300 shadow-[0_0_16px_rgba(139,92,246,0.35)]'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/30 hover:text-gray-200 hover:bg-white/8'
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-purple-600/10 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={isActive ? 'text-purple-400' : 'text-gray-500'}>
                  {tab.icon}
                </span>
                {tab.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${isActive ? 'bg-purple-500/30 text-purple-300' : 'bg-white/10 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Level Legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-8 text-[11px] font-semibold"
        >
          {Object.entries(levelConfig).map(([key, { label, color }]) => (
            <span key={key} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${color}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* ── Skills Grid ── */}
        {visibleSkills.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            <AnimatePresence mode="popLayout">
              {visibleSkills.map((skill, i) => (
                <SkillCard key={skill._id || skill.name} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-16 text-sm"
          >
            No skills found for this category.
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
