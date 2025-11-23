import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Trash2, Activity, Leaf } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI';
import { getHistory, deleteHistoryItem, clearHistory, formatDate, getRiskColor } from '../utils/helpers';

export const History = () => {
    const [activeTab, setActiveTab] = useState('symptoms');
    const [symptomHistory, setSymptomHistory] = useState([]);
    const [plantHistory, setPlantHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        setSymptomHistory(getHistory('symptom'));
        setPlantHistory(getHistory('plant'));
    };

    const handleDelete = (type, id) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            deleteHistoryItem(type, id);
            loadHistory();
        }
    };

    const handleClearAll = (type) => {
        if (confirm(`Are you sure you want to clear all ${type} history?`)) {
            clearHistory(type);
            loadHistory();
        }
    };

    const renderSymptomHistory = () => {
        if (symptomHistory.length === 0) {
            return (
                <div className="text-center py-12">
                    <Activity className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">No symptom checks yet</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {symptomHistory.map((entry) => (
                    <Card key={entry.id} className="relative">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(entry.timestamp)}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Symptoms:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {entry.data.symptoms.map((symptom, i) => (
                                            <Badge key={i} variant="info">{symptom}</Badge>
                                        ))}
                                    </div>
                                </div>

                                {entry.data.results?.diseases?.length > 0 && (
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Top Result:
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {entry.data.results.diseases[0].name}
                                            </span>
                                            <Badge variant={getRiskColor(entry.data.results.diseases[0].riskLevel)}>
                                                {entry.data.results.diseases[0].riskLevel}
                                            </Badge>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                ({entry.data.results.diseases[0].confidence}% confidence)
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => handleDelete('symptom', entry.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        );
    };

    const renderPlantHistory = () => {
        if (plantHistory.length === 0) {
            return (
                <div className="text-center py-12">
                    <Leaf className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">No plant identifications yet</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {plantHistory.map((entry) => (
                    <Card key={entry.id} className="relative">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Leaf className="w-5 h-5 text-green-500" />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(entry.timestamp)}
                                    </span>
                                </div>

                                {entry.data.results && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {entry.data.results.plantName}
                                            </h3>
                                            <Badge variant="success">
                                                {Math.round(entry.data.results.confidence * 100)}% Match
                                            </Badge>
                                        </div>
                                        <p className="text-sm italic text-gray-600 dark:text-gray-300">
                                            {entry.data.results.scientificName}
                                        </p>
                                        {entry.data.results.treatsConditions?.length > 0 && (
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                    Treats:
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {entry.data.results.treatsConditions.slice(0, 3).map((condition, i) => (
                                                        <Badge key={i} variant="default" className="text-xs">
                                                            {condition}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => handleDelete('plant', entry.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        );
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
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
                        <HistoryIcon className="w-10 h-10 text-white" />
                    </div>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    History
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    View your past symptom checks and plant identifications
                </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('symptoms')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'symptoms'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        <Activity className="w-5 h-5 inline-block mr-2" />
                        Symptom Checks
                    </button>
                    <button
                        onClick={() => setActiveTab('plants')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'plants'
                                ? 'bg-green-500 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        <Leaf className="w-5 h-5 inline-block mr-2" />
                        Plant IDs
                    </button>
                </div>

                <Button
                    onClick={() => handleClearAll(activeTab === 'symptoms' ? 'symptom' : 'plant')}
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-500"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                </Button>
            </div>

            {/* Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === 'symptoms' ? renderSymptomHistory() : renderPlantHistory()}
            </motion.div>
        </div>
    );
};
