import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Sun, Moon, Trash2, Info, Mail } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { useTheme } from '../context/ThemeContext';
import { clearHistory } from '../utils/helpers';

export const Settings = () => {
    const { isDark, toggleTheme } = useTheme();

    const handleClearAllData = () => {
        if (confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
            clearHistory('symptom');
            clearHistory('plant');
            alert('All data cleared successfully!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center mb-4">
                        <SettingsIcon className="w-10 h-10 text-white" />
                    </div>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Customize your experience
                </p>
            </div>

            {/* Appearance */}
            <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Appearance
                </h2>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Theme</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Switch between light and dark mode
                        </p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-4 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {isDark ? (
                            <Sun className="w-6 h-6 text-yellow-500" />
                        ) : (
                            <Moon className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </Card>

            {/* Data & Privacy */}
            <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Data & Privacy
                </h2>
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-2">
                            Clear All History
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Remove all saved symptom checks and plant identifications
                        </p>
                        <Button
                            onClick={handleClearAllData}
                            variant="outline"
                            icon={Trash2}
                            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                        >
                            Clear All Data
                        </Button>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Privacy Note:</strong> All your data is stored locally on your device.
                            We do not collect or store any personal health information on our servers.
                        </p>
                    </div>
                </div>
            </Card>

            {/* About */}
            <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6" />
                    About MedTech AI
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>
                        <strong className="text-gray-900 dark:text-white">Version:</strong> 1.0.0
                    </p>
                    <p>
                        MedTech AI is an academic project that combines artificial intelligence with
                        traditional medicinal knowledge to provide health insights and plant identification.
                    </p>
                    <p>
                        This application uses advanced AI models to analyze symptoms and identify medicinal
                        plants, offering natural remedy suggestions based on centuries of traditional medicine.
                    </p>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Technologies Used:
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>React + Vite for frontend</li>
                            <li>Tailwind CSS for styling</li>
                            <li>Framer Motion for animations</li>
                            <li>OpenAI GPT for symptom analysis</li>
                            <li>AI Vision for plant identification</li>
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Academic Project
                        </h3>
                        <p className="text-sm">
                            This is a major academic project developed for educational purposes.
                            It demonstrates the practical application of AI in healthcare and natural medicine.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Contact */}
            <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Mail className="w-6 h-6" />
                    Contact & Feedback
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Have questions or feedback? We'd love to hear from you!
                </p>
                <Button variant="outline">
                    Send Feedback
                </Button>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                    ⚠️ Important Medical Disclaimer
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    This application is for educational and informational purposes only. It is NOT a
                    substitute for professional medical advice, diagnosis, or treatment. Always seek
                    the advice of your physician or qualified health provider with any questions
                    regarding a medical condition. In case of emergency, call your local emergency
                    services immediately.
                </p>
            </Card>
        </div>
    );
};
