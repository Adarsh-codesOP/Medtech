import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Leaf, MessageCircle, ArrowRight, Shield, Zap, Heart } from 'lucide-react';
import { Button, Card } from '../components/UI';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export const Home = () => {
    return (
        <div className="space-y-20 pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center">
                {/* Background Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">AI-Powered Health Assistant</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-tight">
                            Your Personal <br />
                            <span className="heading-gradient">Health Companion</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                            Experience the future of healthcare with AI-driven symptom analysis, medicinal plant identification, and instant doctor connections.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            <Link to="/symptoms">
                                <Button className="text-lg px-8 py-4 shadow-xl shadow-primary/20">
                                    Check Symptoms <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/plants">
                                <Button variant="outline" className="text-lg px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                                    Identify Plants
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center gap-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                            <div>
                                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">98%</h4>
                                <p className="text-sm text-gray-500">Accuracy Rate</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">24/7</h4>
                                <p className="text-sm text-gray-500">AI Support</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">10k+</h4>
                                <p className="text-sm text-gray-500">Plants Database</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-square">
                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 right-0 z-20"
                            >
                                <Card className="w-64 !p-4 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-white/40">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                            <Leaf className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Aloe Vera</h4>
                                            <p className="text-xs text-green-600">Match Found!</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[92%] bg-green-500 rounded-full" />
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 left-0 z-20"
                            >
                                <Card className="w-64 !p-4 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-white/40">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                            <Activity className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Symptom Analysis</h4>
                                            <p className="text-xs text-gray-500">Processing...</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Main Visual */}
                            <div className="absolute inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                                alt="Medical Technology"
                                className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl border-8 border-white/20"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Everything you need to manage your health naturally and effectively.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Activity}
                        title="Symptom Checker"
                        desc="Advanced AI analysis of your symptoms with risk assessment and detailed health reports."
                        color="text-blue-500"
                        delay={0}
                    />
                    <FeatureCard
                        icon={Leaf}
                        title="Plant Identifier"
                        desc="Instantly identify medicinal plants and learn about their healing properties."
                        color="text-green-500"
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={MessageCircle}
                        title="AI Assistant"
                        desc="24/7 intelligent chat support for all your health and wellness queries."
                        color="text-purple-500"
                        delay={0.2}
                    />
                </div>
            </section>

            {/* How it Works */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="relative z-10 p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">How It Works</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <Step number="1" title="Input" desc="Enter symptoms or upload a plant photo" />
                            <Step number="2" title="Analyze" desc="AI processes data instantly" />
                            <Step number="3" title="Report" desc="Get detailed insights & advice" />
                            <Step number="4" title="Connect" desc="Find specialists if needed" />
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
    >
        <Card className="h-full hover:-translate-y-2 transition-transform duration-300">
            <div className={`w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-6 ${color}`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {desc}
            </p>
        </Card>
    </motion.div>
);

const Step = ({ number, title, desc }) => (
    <div className="relative">
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold mb-4 mx-auto">
            {number}
        </div>
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <p className="text-gray-400 text-sm">{desc}</p>
    </div>
);
