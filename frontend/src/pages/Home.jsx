import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ResearchPublication from '../components/ResearchPublication';
import Terminal from '../components/Terminal';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import BugHunterGame from '../components/BugHunterGame';
import TechArtifactHuntGame from '../components/TechArtifactHuntGame';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hide loader after 5 seconds to let the animations play out
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {loading && <Loader />}
            </AnimatePresence>

            <div className={`relative w-full min-h-screen bg-[#050505] transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
            {/* Background blobs for modern aesthetic wrapped to prevent overflow scroll */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-[10%] w-[30rem] h-[30rem] bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-[10%] w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[30rem] h-[30rem] bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>

            <Navbar />

            <main>
                <Hero />
                <About />
                <ResearchPublication />
                <Skills />
                <Projects />
                <Terminal />
                <Certifications />
                <Contact />
                <BugHunterGame />
            </main>

            <Footer />
            <TechArtifactHuntGame />
        </div>
        </>
    );
};

export default Home;
