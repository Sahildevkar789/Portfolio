import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TerminalSquare, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { login, adminInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (adminInfo) {
            navigate('/admin/dashboard');
        }
    }, [adminInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-gray-50 dark:bg-black">
                <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
                <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md z-10 glass rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl relative"
            >
                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-2xl">
                        <Lock className="w-8 h-8 text-primary-500" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-2">Admin Panel</h2>
                <p className="text-gray-500 text-center mb-8">Sign in to manage your portfolio</p>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm text-center border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 pl-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-gray-400"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 pl-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-gray-400"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <a href="/" className="text-gray-500 hover:text-primary-500 flex items-center justify-center gap-2 transition-colors">
                        <TerminalSquare className="w-4 h-4" /> Back to Portfolio
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
