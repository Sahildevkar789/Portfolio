import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, TerminalSquare, User, FileText, Award, Phone, GraduationCap, BookOpen } from 'lucide-react';

const AdminLayout = () => {
    const { adminInfo, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!adminInfo) {
            navigate('/admin/login');
        }
    }, [adminInfo, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!adminInfo) return null;

    const navItems = [
        { path: '/admin/hero', label: 'Hero', icon: <User className="w-4 h-4" /> },
        { path: '/admin/about', label: 'About', icon: <FileText className="w-4 h-4" /> },
        { path: '/admin/education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
        { path: '/admin/research', label: 'Research', icon: <BookOpen className="w-4 h-4" /> },
        { path: '/admin/skills', label: 'Skills', icon: <TerminalSquare className="w-4 h-4" /> },
        { path: '/admin/projects', label: 'Projects', icon: <LayoutDashboard className="w-4 h-4" /> },
        { path: '/admin/certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
        { path: '/admin/contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-gray-800 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
                    <TerminalSquare className="w-6 h-6 text-primary-500" />
                    <span className="font-bold text-xl">Admin Panel</span>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                location.pathname.startsWith(item.path)
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                    <Link to="/" className="w-full mt-2 flex items-center justify-center py-2 text-sm text-gray-500 hover:underline">
                        View Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
