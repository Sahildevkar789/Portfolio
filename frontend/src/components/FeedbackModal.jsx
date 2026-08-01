import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Lightbulb, Bug, MessageSquare } from 'lucide-react';
import axios from 'axios';

const FeedbackModal = ({ isOpen, onClose, initialType = 'Improvement' }) => {
    const [formData, setFormData] = useState({
        type: initialType,
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post(`${API}/feedback`, formData);
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ type: 'Improvement', email: '', message: '' });
            }, 2500);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Something went wrong');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    if (!isOpen) return null;

    const icons = {
        Improvement: <Lightbulb className="w-5 h-5 text-amber-500" />,
        Bug: <Bug className="w-5 h-5 text-red-500" />,
        Support: <MessageSquare className="w-5 h-5 text-blue-500" />
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl border border-white/5">
                            {icons[formData.type]}
                        </div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Submit {formData.type}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    {status === 'success' ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-10 text-center"
                        >
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                            <p className="text-gray-400">Your {formData.type.toLowerCase()} has been submitted successfully.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Feedback Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Improvement', 'Bug', 'Support'].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: t })}
                                            className={`py-2 px-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${
                                                formData.type === t
                                                    ? 'bg-purple-600/20 border-purple-500/40 text-purple-300'
                                                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Your Email (Optional)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Message *</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors h-32 resize-none placeholder:text-gray-600"
                                    placeholder={formData.type === 'Bug' ? "What happened? How can I reproduce it?" : "What's on your mind?"}
                                />
                            </div>

                            {status === 'error' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }} 
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-medium"
                                >
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {errorMessage}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" /> Submit Request
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default FeedbackModal;
