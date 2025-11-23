import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Activity, Leaf, MessageCircle, Clock, Settings, User, AlertTriangle, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { cn } from '../utils/helpers';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/symptoms', label: 'Symptoms', icon: Activity },
    { path: '/plants', label: 'Plants', icon: Leaf },
    { path: '/interactions', label: 'Interactions', icon: AlertTriangle },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/history', label: 'History', icon: Clock },
];

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
];

export const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const { language, setLanguage } = useUser();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 rounded-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary dark:to-secondary">
                                MedTech AI
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                                            isActive
                                                ? "bg-primary/10 text-primary dark:text-primary-light"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Language Selector */}
                            <div className="relative group">
                                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <Globe className="w-5 h-5" />
                                    {languages.find(l => l.code === language)?.flag}
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-40 py-2 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code)}
                                            className={cn(
                                                "w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5",
                                                language === lang.code ? "text-primary font-bold" : "text-gray-700 dark:text-gray-300"
                                            )}
                                        >
                                            <span className="text-lg">{lang.flag}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? (
                                    <span className="text-xl">☀️</span>
                                ) : (
                                    <span className="text-xl">🌙</span>
                                )}
                            </button>

                            <Link to="/settings">
                                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                    <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4">
                            {/* Mobile Language Toggle (Simplified) */}
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                                className="text-xl"
                            >
                                {languages.find(l => l.code === language)?.flag}
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface"
                        >
                            <div className="px-4 pt-2 pb-4 space-y-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "block px-3 py-3 rounded-lg text-base font-medium flex items-center gap-3",
                                                isActive
                                                    ? "bg-primary/10 text-primary dark:text-primary-light"
                                                    : "text-gray-600 dark:text-gray-400"
                                            )}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between px-3">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dark Mode</span>
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2 rounded-lg bg-gray-100 dark:bg-white/5"
                                    >
                                        {isDarkMode ? '☀️' : '🌙'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} MedTech AI. Academic Project.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Disclaimer: This is an AI assistant. Always consult a professional doctor for medical advice.
                    </p>
                </div>
            </footer>
        </div>
    );
};
