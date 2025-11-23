import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Pill, Leaf } from 'lucide-react';
import { Card, Button, Input, Badge, LoadingSpinner } from '../components/UI';
import { useUser } from '../context/UserContext';
import axios from 'axios';

export const InteractionChecker = () => {
    const { userProfile } = useUser();
    const [herb, setHerb] = useState('');
    const [medication, setMedication] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCheck = async () => {
        if (!herb || !medication) {
            setError('Please enter both a herb/supplement and a medication');
            return;
        }

        setIsAnalyzing(true);
        setError('');
        setResult(null);

        try {
            // We'll reuse the chat endpoint for this specific query to save creating a new route
            // In a real app, a dedicated route is better, but this works for the MVP
            const prompt = `Check for interactions between:
            Herb/Supplement: ${herb}
            Medication: ${medication}
            
            Provide response in JSON format:
            {
                "interaction": boolean,
                "severity": "High" | "Moderate" | "Low" | "None",
                "mechanism": "Brief explanation of how they interact",
                "recommendation": "Medical advice"
            }`;

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
                message: prompt,
                history: [] // No history needed
            });

            // Parse the JSON response from the chat endpoint
            // Note: The chat endpoint returns { reply: "string" }, we need to parse that string
            let analysis;
            try {
                const jsonMatch = response.data.reply.match(/\{[\s\S]*\}/);
                analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
            } catch (e) {
                console.error("Parse error", e);
            }

            if (analysis) {
                setResult(analysis);
            } else {
                // Fallback if AI doesn't return JSON
                setResult({
                    interaction: true,
                    severity: "Unknown",
                    mechanism: response.data.reply,
                    recommendation: "Consult a doctor."
                });
            }

        } catch (err) {
            setError('Failed to check interactions. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const fillFromProfile = (med) => {
        setMedication(med);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                </motion.div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
                    Interaction Checker
                </h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Ensure your safety by checking for potential conflicts between natural remedies and your medications.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-green-500" />
                        Herb / Supplement
                    </h2>
                    <Input
                        value={herb}
                        onChange={(e) => setHerb(e.target.value)}
                        placeholder="e.g. St. John's Wort, Garlic, Ginseng"
                        className="bg-white dark:bg-gray-800"
                    />
                </Card>

                <Card className="glass-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Pill className="w-5 h-5 text-blue-500" />
                        Medication
                    </h2>
                    <Input
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                        placeholder="e.g. Warfarin, Aspirin"
                        className="bg-white dark:bg-gray-800 mb-4"
                    />

                    {userProfile.medications.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">From your profile:</p>
                            <div className="flex flex-wrap gap-2">
                                {userProfile.medications.map((med, i) => (
                                    <Badge
                                        key={i}
                                        variant="info"
                                        className="cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                        onClick={() => fillFromProfile(med)}
                                    >
                                        {med}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={handleCheck}
                    disabled={isAnalyzing || !herb || !medication}
                    className="px-8 py-4 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-orange-500/20"
                >
                    {isAnalyzing ? <LoadingSpinner className="mr-2" /> : <RefreshCw className="mr-2 w-5 h-5" />}
                    Check Interactions
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-xl text-center">
                    {error}
                </div>
            )}

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <Card className={`glass-card border-l-4 ${result.severity === 'High' ? 'border-l-red-500' :
                                result.severity === 'Moderate' ? 'border-l-yellow-500' :
                                    'border-l-green-500'
                            }`}>
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-full ${result.severity === 'High' ? 'bg-red-100 text-red-600' :
                                        result.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-green-100 text-green-600'
                                    }`}>
                                    {result.severity === 'High' ? <XCircle className="w-8 h-8" /> :
                                        result.severity === 'Moderate' ? <AlertTriangle className="w-8 h-8" /> :
                                            <CheckCircle className="w-8 h-8" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {result.interaction ? 'Interaction Detected' : 'No Interaction Found'}
                                        </h3>
                                        <Badge variant={
                                            result.severity === 'High' ? 'danger' :
                                                result.severity === 'Moderate' ? 'warning' :
                                                    'success'
                                        }>
                                            Severity: {result.severity}
                                        </Badge>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Mechanism</h4>
                                            <p className="text-gray-600 dark:text-gray-400">{result.mechanism}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Recommendation</h4>
                                            <p className="text-gray-600 dark:text-gray-400">{result.recommendation}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
