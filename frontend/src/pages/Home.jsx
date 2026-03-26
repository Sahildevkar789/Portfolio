import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
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
    const [backendReady, setBackendReady] = useState(false);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        // Function to check if backend is awake
        const checkBackend = async () => {
            try {
                // Ping the root or any lightweight endpoint
                await axios.get(API_URL.replace('/api', '') + '/');
                setBackendReady(true);
            } catch (error) {
                console.log("Backend warming up...");
                // Retry after a short delay
                setTimeout(checkBackend, 2000);
            }
        };

        checkBackend();

        // Minimum loading time for aesthetics
        const minTimer = setTimeout(() => {
            if (backendReady) {
                setLoading(false);
            }
        }, 3000);

        return () => clearTimeout(minTimer);
    }, [backendReady]);

    // Handle the case where backend becomes ready after the minimum timer
    useEffect(() => {
        if (backendReady && loading) {
            // Give it a small extra delay for a smooth transition
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [backendReady, loading]);

    return (
        <>
            <AnimatePresence>
                {loading && <Loader isBackendReady={backendReady} />}
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
