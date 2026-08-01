import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    User, Target, GraduationCap, Briefcase, Star,
    MapPin, Calendar, ChevronRight, Sparkles, Code2, Cloud,
    CheckCircle2
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ── Floating Orb ───────────────────────────────── */
const FloatingOrb = ({ className }) => (
    <motion.div
        animate={{ y: [0, -16, 0], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    />
);

/* ── Section Badge ───────────────────────────────── */
const SectionBadge = ({ icon, label }) => (
    <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg
            bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/30">
            {icon}
        </div>
        <span className="text-lg font-bold text-white tracking-wide">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent ml-2" />
    </div>
);

/* ── Education Card ─────────────────────────────── */
const EducationCard = ({ edu, index }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group relative p-5 rounded-2xl border border-white/10 bg-white/5
            hover:border-purple-500/40 hover:bg-purple-500/5
            hover:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            transition-all duration-300"
    >
        {/* Shimmer */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
            transition-opacity duration-300 pointer-events-none
            bg-gradient-to-br from-purple-600/8 via-transparent to-blue-600/8" />

        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20
                text-purple-400 group-hover:text-purple-300 transition-colors">
                <GraduationCap size={18} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white leading-tight">
                    {edu.level}
                    {edu.field && (
                        <span className="text-purple-400 font-medium ml-1">– {edu.field}</span>
                    )}
                </h4>
                <p className="text-sm text-gray-300 mt-0.5 font-medium">{edu.institution}</p>
                {edu.board && (
                    <p className="text-xs text-gray-500 mt-0.5">{edu.board}</p>
                )}
            </div>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2">
            {edu.year && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                    bg-blue-500/15 text-blue-400 border border-blue-500/25">
                    <Calendar size={11} />
                    {edu.year}
                </span>
            )}
            {edu.grade && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                    bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    <Star size={11} />
                    {edu.grade}
                </span>
            )}
            {edu.status && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                    bg-amber-500/15 text-amber-400 border border-amber-500/25">
                    <CheckCircle2 size={11} />
                    {edu.status}
                </span>
            )}
        </div>
    </motion.div>
);

/* ── Experience Card ────────────────────────────── */
const ExperienceCard = ({ exp, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative flex gap-5"
    >
        {/* Timeline line */}
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-purple-500 to-blue-500
                shadow-[0_0_16px_rgba(139,92,246,0.4)] text-white z-10">
                <Briefcase size={18} />
            </div>
            <div className="w-px flex-1 bg-gradient-to-b from-purple-500/50 to-transparent mt-2" />
        </div>

        {/* Content card */}
        <div className="flex-1 mb-8 p-5 rounded-2xl border border-white/10 bg-white/5
            hover:border-purple-500/40 hover:bg-purple-500/5
            hover:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            transition-all duration-300">

            {/* Role + type badge */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full
                    bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {exp.type}
                </span>
            </div>

            {/* Company + location */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                <span className="font-semibold text-gray-300">{exp.company}</span>
                {exp.location && (
                    <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                    </span>
                )}
                <span className="flex items-center gap-1 text-purple-400 font-medium">
                    <Calendar size={12} />
                    {exp.startDate} – {exp.endDate || 'Present'}
                </span>
            </div>

            {/* Bullet points */}
            {exp.description && exp.description.length > 0 && (
                <ul className="space-y-1.5">
                    {exp.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                            <ChevronRight size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </motion.div>
);

/* ── Main About Component ───────────────────────── */
const About = () => {
    const [aboutData, setAboutData] = useState({ bio: '', goals: '', interests: [] });
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [aboutRes, eduRes, expRes] = await Promise.all([
                    axios.get(`${API}/about`),
                    axios.get(`${API}/education`),
                    axios.get(`${API}/experience`),
                ]);
                if (aboutRes.data && Object.keys(aboutRes.data).length > 0) {
                    setAboutData({
                        bio: aboutRes.data.bio || '',
                        goals: aboutRes.data.goals || '',
                        interests: aboutRes.data.interests || [],
                    });
                }
                if (Array.isArray(eduRes.data)) setEducations(eduRes.data);
                if (Array.isArray(expRes.data)) setExperiences(expRes.data);
            } catch (err) {
                console.error('Error fetching about/education/experience:', err);
            }
        };
        fetch();
    }, []);

    const interests = aboutData.interests.length > 0
        ? aboutData.interests
        : ['Full-Stack Development', 'Cybersecurity', 'Cloud Computing', 'Open Source'];

    return (
        <section id="about" className="relative py-24 px-4 overflow-hidden bg-[#0a0a0f]">
            <FloatingOrb className="w-80 h-80 bg-purple-600/15 -top-20 right-0" />
            <FloatingOrb className="w-72 h-72 bg-blue-600/10 bottom-20 -left-20" />

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase
                            bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4"
                    >
                        <Sparkles size={12} className="inline mr-1" />
                        Who I Am
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        About{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Me
                        </span>
                    </h2>
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <div className="h-px w-14 bg-gradient-to-r from-transparent to-purple-500" />
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <div className="h-px w-14 bg-gradient-to-r from-purple-500 to-transparent" />
                    </div>
                </motion.div>

                {/* ── TOP 2-COLUMN GRID ── */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">

                    {/* LEFT — About Me + Goals + Interests */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col gap-6"
                    >
                        {/* About Me card */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                            <SectionBadge icon={<User size={16} />} label="About Me" />
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                                {aboutData.bio ||
                                    `I'm a passionate Computer Engineering student specializing in full-stack development and cybersecurity. I love building impactful software and solving real-world security challenges.`}
                            </p>
                        </div>

                        {/* Career Goals card */}
                        {aboutData.goals && (
                            <div className="p-6 rounded-2xl border border-purple-500/20
                                bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                                <SectionBadge icon={<Target size={16} />} label="Career Goals" />
                                <p className="text-gray-300 leading-relaxed text-sm">{aboutData.goals}</p>
                            </div>
                        )}

                        {/* Interests */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                            <SectionBadge icon={<Code2 size={16} />} label="Interests" />
                            <div className="flex flex-wrap gap-2">
                                {interests.map((item, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                                            bg-white/5 border border-white/10 text-gray-300
                                            hover:border-purple-500/40 hover:text-purple-300
                                            transition-colors duration-200"
                                    >
                                        <Cloud size={12} className="text-purple-400" />
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT — Education */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 h-full">
                            <SectionBadge icon={<GraduationCap size={16} />} label="Education" />

                            {educations.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {educations.map((edu, i) => (
                                        <EducationCard key={edu._id || i} edu={edu} index={i} />
                                    ))}
                                </div>
                            ) : (
                                /* Fallback static card */
                                <EducationCard
                                    edu={{
                                        level: "B.Tech Computer Engineering",
                                        institution: "Fr. Conceicao Rodrigues Institute of Technology",
                                        board: "University of Mumbai",
                                        year: "2023 – 2027",
                                        grade: "CGPA: 9.01",
                                        status: "Pursuing"
                                    }}
                                    index={0}
                                />
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* ── BOTTOM — Experience ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5">
                        <SectionBadge icon={<Briefcase size={16} />} label="Experience & Work" />

                        {experiences.length > 0 ? (
                            <div className="mt-4">
                                {experiences.map((exp, i) => (
                                    <ExperienceCard key={exp._id || i} exp={exp} index={i} />
                                ))}
                            </div>
                        ) : (
                            /* Fallback static experience */
                            <div className="mt-4">
                                <ExperienceCard
                                    exp={{
                                        role: "Cyber Security Intern",
                                        company: "Cyber Leelavat",
                                        location: "Mumbai",
                                        startDate: "Feb 2026",
                                        endDate: "Mar 2026",
                                        type: "Internship",
                                        description: [
                                            "Performed web application vulnerability testing",
                                            "Conducted basic penetration testing and bug identification",
                                            "Worked on cybersecurity tools and report generation",
                                            "Developed CyberShield platform for real-time vulnerability analysis",
                                        ],
                                    }}
                                    index={0}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
