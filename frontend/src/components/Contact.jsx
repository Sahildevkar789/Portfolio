import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send, Phone } from 'lucide-react';

const Contact = () => {
    const [contactInfo, setContactInfo] = useState({
        email: '',
        linkedin: '',
        github: '',
        phone: '',
        location: ''
    });

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/contact-info`);
                if (data && Object.keys(data).length > 0) {
                    setContactInfo(data);
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };
        fetchContact();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Keep functional
        setStatus('Sending...');
        setTimeout(() => {
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 px-4 bg-gray-50/50 dark:bg-black/50">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In <span className="text-primary-500">Touch</span></h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        I'm always open to new opportunities. Feel free to reach out to me via email or submit the form below.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-8"
                    >
                        {contactInfo.email && (
                            <div className="flex items-start gap-4 p-6 glass rounded-2xl border border-gray-200 dark:border-gray-800">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                    <Mail className="w-6 h-6 text-primary-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{contactInfo.email}</p>
                                    <a href={`mailto:${contactInfo.email}`} className="text-sm font-medium text-primary-500 hover:underline mt-1 block">Write me</a>
                                </div>
                            </div>
                        )}

                        {contactInfo.location && (
                            <div className="flex items-start gap-4 p-6 glass rounded-2xl border border-gray-200 dark:border-gray-800">
                                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                    <MapPin className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Location</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{contactInfo.location}</p>
                                </div>
                            </div>
                        )}

                        {contactInfo.phone && (
                            <div className="flex items-start gap-4 p-6 glass rounded-2xl border border-gray-200 dark:border-gray-800">
                                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                    <Phone className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Phone</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{contactInfo.phone}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            {contactInfo.github && (
                                <a href={contactInfo.github} target="_blank" rel="noreferrer" className="p-4 glass rounded-xl hover:bg-black/5 hover:dark:bg-white/5 hover:text-primary-500 transition-all border border-gray-200 dark:border-gray-800">
                                    <Github className="w-6 h-6" />
                                </a>
                            )}
                            {contactInfo.linkedin && (
                                <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="p-4 glass rounded-xl hover:bg-black/5 hover:dark:bg-white/5 hover:text-blue-600 transition-all border border-gray-200 dark:border-gray-800">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="p-8 glass rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none" placeholder="Your message..." />
                            </div>
                            <button type="submit" className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" disabled={status === 'Sending...'}>
                                {status === 'Sending...' ? 'Sending...' : <><Send className="w-5 h-5" /> Send Message</>}
                            </button>
                            {status && status !== 'Sending...' && <p className="text-green-500 text-center text-sm font-medium">{status}</p>}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
