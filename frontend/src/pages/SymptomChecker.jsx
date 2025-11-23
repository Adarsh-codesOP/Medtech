import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Mic, MicOff, Download, Save, AlertCircle, User } from 'lucide-react';
import { Button, Card, Badge, LoadingSpinner } from '../components/UI';
import { downloadPDF, saveToHistory, startVoiceRecognition } from '../utils/helpers';
import { analyzeSymptoms } from '../services/api';
import { useUser } from '../context/UserContext';
import { DoctorConnect } from '../components/DoctorConnect';

const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
    'Sore Throat', 'Body Ache', 'Chills', 'Shortness of Breath',
    'Loss of Appetite', 'Runny Nose', 'Chest Pain', 'Abdominal Pain',
];

export const SymptomChecker = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState('');

    const { userProfile, language } = useUser();

    const addSymptom = (symptom) => {
        if (symptom && !symptoms.includes(symptom)) {
            setSymptoms([...symptoms, symptom]);
            setInputValue('');
        }
    };

    const removeSymptom = (symptom) => {
        setSymptoms(symptoms.filter(s => s !== symptom));
    };

    const handleVoiceInput = () => {
        if (isListening) return;

        setIsListening(true);
        startVoiceRecognition(
            (transcript) => {
                const newSymptoms = transcript.split(/,|and/).map(s => s.trim()).filter(Boolean);
                setSymptoms([...new Set([...symptoms, ...newSymptoms])]);
                setIsListening(false);
            },
            (error) => {
                setError(`Voice recognition error: ${error}`);
                setIsListening(false);
            }
        );
    };

    const handleAnalyze = async () => {
        if (symptoms.length === 0) {
            setError('Please add at least one symptom');
            return;
        }

        setIsAnalyzing(true);
        setError('');

        try {
            const data = await analyzeSymptoms(symptoms, userProfile, language);
            setResults(data);
        } catch (err) {
            setError(err.message || 'Failed to analyze symptoms. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('results-content');
        downloadPDF(element, `symptom-analysis-${Date.now()}.pdf`);
    };

    const handleSaveToHistory = () => {
        saveToHistory('symptom', { symptoms, results });
        alert('Saved to history!');
    };

    const getRiskColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const getRiskIcon = (level) => {
        switch (level?.toLowerCase()) {
            case 'high': return '🔴';
            case 'medium': return '🟡';
            case 'low': return '🟢';
            default: return '⚪';
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                        <Activity className="w-10 h-10 text-white" />
                    </div>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Symptom Analysis
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Enter your symptoms and let our AI analyze potential health conditions
                </p>
            </div>

            {/* Input Section */}
            <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    What symptoms are you experiencing?
                </h2>

                {/* Input Field */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSymptom(inputValue)}
                        placeholder="Type a symptom and press Enter"
                        className="input-field flex-1"
                    />
                    <Button
                        onClick={handleVoiceInput}
                        variant={isListening ? 'secondary' : 'outline'}
                        icon={isListening ? MicOff : Mic}
                    >
                        {isListening ? 'Listening...' : 'Voice'}
                    </Button>
                </div>

                {/* Selected Symptoms */}
                {symptoms.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Selected Symptoms:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {symptoms.map((symptom, index) => (
                                <Badge key={index} variant="info" className="cursor-pointer group">
                                    {symptom}
                                    <button
                                        onClick={() => removeSymptom(symptom)}
                                        className="ml-2 text-blue-600 dark:text-blue-400 group-hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Common Symptoms */}
                <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Common Symptoms:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {commonSymptoms.map((symptom, index) => (
                            <Badge
                                key={index}
                                variant="default"
                                className="cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                                onClick={() => addSymptom(symptom)}
                            >
                                + {symptom}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                )}

                {/* Analyze Button */}
                <div className="mt-6">
                    <Button
                        onClick={handleAnalyze}
                        disabled={symptoms.length === 0 || isAnalyzing}
                        className="w-full"
                    >
                        {isAnalyzing ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Symptoms'
                        )}
                    </Button>
                </div>
            </Card>

            {/* Results Section */}
            <AnimatePresence>
                {results && (
                    <motion.div
                        id="results-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-end">
                            <Button onClick={handleDownloadPDF} variant="outline" icon={Download}>
                                Download PDF
                            </Button>
                            <Button onClick={handleSaveToHistory} variant="outline" icon={Save}>
                                Save to History
                            </Button>
                        </div>

                        {/* Disease Predictions */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Possible Conditions
                            </h2>
                            {results.diseases?.map((disease, index) => (
                                <Card key={index} className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {disease.name}
                                                </h3>
                                                <Badge variant={getRiskColor(disease.riskLevel)}>
                                                    {getRiskIcon(disease.riskLevel)} {disease.riskLevel}
                                                </Badge>
                                                <Badge variant="info">{disease.confidence}% Match</Badge>
                                            </div>

                                            {/* Profile Relevance Section */}
                                            {disease.profileAnalysis && (
                                                <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                                        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                                                            Profile Relevance: {disease.profileAnalysis.matchScore}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-indigo-800 dark:text-indigo-200">
                                                        {disease.profileAnalysis.explanation}
                                                    </p>
                                                </div>
                                            )}

                                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                {disease.reasoning}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Recommended Plants */}
                                    {disease.recommendedPlants?.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                🌿 Recommended Medicinal Plants:
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {disease.recommendedPlants.map((plant, i) => (
                                                    <Badge key={i} variant="success">{plant}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Remedies */}
                                    {disease.remedies?.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                💊 Home Remedies:
                                            </h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                                {disease.remedies.map((remedy, i) => (
                                                    <li key={i}>{remedy}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Preventive Measures */}
                                    {disease.preventiveMeasures?.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                🛡️ Preventive Measures:
                                            </h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                                {disease.preventiveMeasures.map((measure, i) => (
                                                    <li key={i}>{measure}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Diet & Exercise */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {disease.diet?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    🥗 Recommended Diet:
                                                </h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                                    {disease.diet.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {disease.exercises?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    🏃 Recommended Exercises:
                                                </h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                                    {disease.exercises.map((exercise, i) => (
                                                        <li key={i}>{exercise}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* General Advice */}
                        {results.generalAdvice && (
                            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                                    💡 General Advice
                                </h3>
                                <p className="text-blue-800 dark:text-blue-300">
                                    {results.generalAdvice}
                                </p>
                            </Card>
                        )}

                        {/* Doctor Connect Feature */}
                        {results.diseases?.length > 0 && (
                            <DoctorConnect
                                diseaseName={results.diseases[0].name}
                                symptoms={symptoms}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
