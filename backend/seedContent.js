import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from './models/Hero.js';
import About from './models/About.js';
import Skill from './models/Skill.js';
import Project from './models/Project.js';
import Certification from './models/Certification.js';
import ContactInfo from './models/ContactInfo.js';
import connectDB from './config/db.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();
        
        console.log('Clearing existing data...');
        // Only clearing content data, maintaining Users (Admin)
        await Hero.deleteMany();
        await About.deleteMany();
        await Skill.deleteMany();
        await Project.deleteMany();
        await Certification.deleteMany();
        await ContactInfo.deleteMany();

        console.log('Seeding Hero...');
        await Hero.create({
            name: "Sahil",
            tagline: "Turning Vision Into \\n Digital Reality",
            intro: "Full Stack Developer | Backend Specialist | Cloud & Cybersecurity Enthusiast.\nBuilding modern, scalable, and responsive web applications.",
            resumeLink: "/resume.pdf",
            profileImage: "/profile.png",
            backgroundImage: ""
        });

        console.log('Seeding About...');
        await About.create({
            bio: "Hi, I'm Sahil Santosh Devkar, a passionate B.Tech Computer Engineering student based in Mumbai, India.\nMy journey in tech is driven by a strong desire to build impactful, scalable systems and intelligent applications.\n\nI specialize in full-stack development with a strong focus on backend architecture, cybersecurity, and machine learning. Beyond coding, I'm deeply interested in Cloud Computing, AI Security, and Robotics.",
            education: ["B.Tech Computer Engineering"],
            goals: "Focusing on advanced full-stack systems, machine learning security models, cloud infrastructure, and building innovative tech solutions that prevent cyber fraud.",
            interests: ["Full-Stack Development", "Cybersecurity", "Machine Learning", "Cloud Computing", "AI Security", "Robotics"]
        });

        console.log('Seeding Skills...');
        const skillsData = [
            // Programming
            { category: 'Programming', name: 'JavaScript', level: 90 },
            { category: 'Programming', name: 'Python', level: 85 },
            { category: 'Programming', name: 'Java', level: 80 },
            { category: 'Programming', name: 'C', level: 75 },
            // Web Development
            { category: 'Web Development', name: 'React.js', level: 90 },
            { category: 'Web Development', name: 'Node.js', level: 85 },
            { category: 'Web Development', name: 'Express.js', level: 85 },
            { category: 'Web Development', name: 'MongoDB', level: 80 },
            { category: 'Web Development', name: 'HTML/CSS', level: 95 },
            // Tools
            { category: 'Tools', name: 'Git & GitHub', level: 90 },
            { category: 'Tools', name: 'VS Code', level: 95 },
            { category: 'Tools', name: 'Postman', level: 85 },
            { category: 'Tools', name: 'Linux', level: 80 },
            // Concepts
            { category: 'Concepts', name: 'REST APIs', level: 90 },
            { category: 'Concepts', name: 'Data Structures', level: 80 },
            { category: 'Concepts', name: 'Cloud Computing', level: 70 },
            { category: 'Concepts', name: 'Cybersecurity Basics', level: 65 }
        ];
        await Skill.insertMany(skillsData);

        console.log('Seeding Projects...');
        const projectsData = [
            {
                title: 'CyberShield – AI-Powered Cybersecurity Platform',
                description: 'CyberShield is an AI-powered cybersecurity platform that combines machine learning and microservices to detect phishing websites, analyze password strength, scan network ports, and evaluate website security.',
                technologies: ['Python', 'Machine Learning', 'React', 'Node.js', 'Microservices', 'Flask', 'Cybersecurity'],
                image: '/projects/cybershield.png',
                githubLink: 'https://github.com/Sahildevkar789',
                liveLink: 'https://cyber-shield-rose.vercel.app/',
                featured: true
            },
            {
                title: 'AI-Based Deepfake & Malicious QR/URL Scam Detector',
                description: 'Designed an AI-based system to detect deepfake images and malicious QR/URL scams to prevent fraud and phishing attacks. Features real-time scanning and uncertainty-aware risk scoring.',
                technologies: ['Python', 'XGBoost', 'Machine Learning', 'OpenCV', 'Flask', 'Isotonic Regression'],
                image: '/projects/qr_scam_detector.png',
                githubLink: 'https://github.com/Sahildevkar789',
                liveLink: 'https://drive.google.com/file/d/1W6-yuXFElxJT2tffWROM9Ed-FZeVxJsk/view',
                featured: true
            },
            {
                title: 'Sports Solutions - A Training and Reservation System',
                description: 'Developed a web and mobile application for real-time sports facility booking and management. Supports user authentication, slot reservation, and admin dashboard.',
                technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'React Native'],
                image: '/projects/sports_solutions.png',
                githubLink: 'https://github.com/Sahildevkar789',
                liveLink: '#',
                featured: true
            },
            {
                title: 'Signature Verification System (Machine Learning)',
                description: 'Built a machine learning-based system to verify handwritten signatures and detect forged signatures. Implemented image preprocessing and feature extraction for accurate signature matching and validation.',
                technologies: ['Python', 'Machine Learning', 'OpenCV', 'CNN', 'TensorFlow'],
                image: '/projects/signature_verifier.png',
                githubLink: 'https://github.com/Sahildevkar789',
                liveLink: '#',
                featured: true
            },
            {
                title: 'BharatMeet – Video Conferencing Application',
                description: 'A real-time video meeting platform with user authentication and session management features. Enabled live communication and collaboration through integrated chat and video functionality.',
                technologies: ['React', 'WebRTC', 'Socket.io', 'Node.js', 'Express'],
                image: '/projects/bharat_meet.png',
                githubLink: 'https://github.com/Sahildevkar789',
                liveLink: '#',
                featured: false
            },
            {
                title: 'Smart Fire Detection and Extinguishing Robot',
                description: 'Designed and developed an autonomous fire detection and suppression robot that detects flames, navigates to the source, and automatically extinguishes the fire using a water-spraying mechanism.',
                technologies: ['Arduino/Raspberry Pi', 'Sensors', 'Robotics', 'Embedded C++', 'Computer Vision'],
                image: '/projects/fire_robot.png',
                githubLink: 'https://github.com/Sahildevkar789',
                liveLink: '#',
                featured: false
            }
        ];
        await Project.insertMany(projectsData);

        console.log('Seeding Certifications...');
        const certsData = [
            {
                title: 'Meta Back-End Developer Professional Certificate',
                organization: 'Meta (Coursera)',
                date: 'Aug 2024',
                certificateImage: '',
                certificateLink: '#'
            },
            {
                title: 'Oracle Cloud Infrastructure 2025 Certified Cloud Architect Professional',
                organization: 'Oracle Cloud',
                date: '2025',
                certificateImage: '',
                certificateLink: '#'
            },
            {
                title: 'Build for Bharat – Student Innovators Challenge',
                organization: 'Build for Bharat / ONDC',
                date: '2025',
                certificateImage: '',
                certificateLink: '#'
            },
            {
                title: 'Snowstorm Hackathon – National Level Hackathon',
                organization: 'National Level Hackathon',
                date: '2025',
                certificateImage: '',
                certificateLink: '#'
            },
            {
                title: 'Ethical Hacker',
                organization: 'Cisco Networking Academy',
                date: 'June 2025',
                certificateImage: '',
                certificateLink: '#'
            },
            {
                title: 'Techsparks 2025 – Intercollegiate Project Presentation Competition',
                organization: 'Intercollegiate Competition',
                date: '2025',
                certificateImage: '',
                certificateLink: '#'
            },
            {
                title: 'Full Stack Web Development (MERN)',
                organization: 'Professional Certification',
                date: 'January 2025',
                certificateImage: '',
                certificateLink: '#'
            }
        ];
        await Certification.insertMany(certsData);

        console.log('Seeding Contact Info...');
        await ContactInfo.create({
            email: "devkarsahil2003@gmail.com",
            linkedin: "https://linkedin.com/in/sahildevkar",
            github: "https://github.com/sahildevkar",
            phone: "",
            location: "Mumbai, India"
        });

        console.log('Database Seeding Completed Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
}

seedDatabase();
