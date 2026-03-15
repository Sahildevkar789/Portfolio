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
            profileImage: "",
            backgroundImage: ""
        });

        console.log('Seeding About...');
        await About.create({
            bio: "Hi, I'm Sahil Santosh Devkar, a passionate B.Tech Computer Engineering Student based in Mumbai, India.\nMy journey in tech is driven by a strong desire to build impactful, scalable systems and intuitive user interfaces.\n\nI specialize in full-stack development with a strong focus on backend architecture. Beyond coding, I'm deeply interested in Cloud Computing, Cybersecurity, and AI.\nMy goal is to craft digital experiences that are not just functional, but exceptional.",
            education: ["B.Tech Computer Engineering"],
            goals: "Focusing on full-stack development, algorithms, system design, and cutting-edge software engineering practices.",
            interests: ["Cloud Computing", "Web Development", "Backend Architecture", "Cybersecurity", "AI"]
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
                title: 'Sports Turf Booking System (MERN)',
                description: 'A full-stack application for booking sports turfs. Includes user authentication, real-time availability checking, and admin management dashbaord.',
                technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
                image: 'default.jpg',
                githubLink: '#',
                liveLink: '#',
                featured: true
            },
            {
                title: 'Airbnb Clone',
                description: 'A responsive clone of Airbnb with property listings, map integration, and mock booking functionality.',
                technologies: ['React', 'Tailwind CSS', 'Firebase'],
                image: 'default.jpg',
                githubLink: '#',
                liveLink: '#',
                featured: true
            },
            {
                title: 'BharatMeet Website',
                description: 'A video conferencing web application allowing users to create rooms and join meetings seamlessly.',
                technologies: ['React', 'WebRTC', 'Socket.io', 'Node.js'],
                image: 'default.jpg',
                githubLink: '#',
                liveLink: '#',
                featured: false
            },
            {
                title: 'Weather App',
                description: 'A dynamic weather application using third-party APIs to fetch real-time weather data for any city.',
                technologies: ['React', 'OpenWeather API', 'CSS'],
                image: 'default.jpg',
                githubLink: '#',
                liveLink: '#',
                featured: false
            }
        ];
        await Project.insertMany(projectsData);

        console.log('Seeding Certifications...');
        const certsData = [
            { title: 'Meta Back-End Developer Professional Certificate', organization: 'Coursera (Meta)', date: '2025', certificateImage: '', certificateLink: '#' },
            { title: 'Programming in Python', organization: 'Coursera (Meta)', date: '2024', certificateImage: '', certificateLink: '#' },
            { title: 'APIs and Web Services', organization: 'Coursera (Meta)', date: '2024', certificateImage: '', certificateLink: '#' },
            { title: 'Django Web Framework', organization: 'Coursera (Meta)', date: '2024', certificateImage: '', certificateLink: '#' },
            { title: 'Version Control with Git', organization: 'Coursera (Meta)', date: '2024', certificateImage: '', certificateLink: '#' },
            { title: 'Database Development', organization: 'Coursera (Meta)', date: '2024', certificateImage: '', certificateLink: '#' }
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
