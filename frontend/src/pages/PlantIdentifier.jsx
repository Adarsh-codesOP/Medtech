import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Upload, X, Download, Save, AlertCircle } from 'lucide-react';
import { Button, Card, Badge, LoadingSpinner } from '../components/UI';
import { downloadPDF, saveToHistory } from '../utils/helpers';
import { identifyPlant } from '../services/api';
import { useUser } from '../context/UserContext';

export const PlantIdentifier = () => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (files) => {
        const fileArray = Array.from(files).slice(0, 3); // Max 3 images
        setImages(fileArray);

        // Create previews
        const previewUrls = fileArray.map(file => URL.createObjectURL(file));
        setPreviews(previewUrls);
        setError('');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setImages(newImages);
        saveToHistory('plant', { images: previews, results });
        alert('Saved to history!');
    };

    const { userProfile, language } = useUser();

    const handleIdentify = async () => {
        if (images.length === 0) return;

        setIsAnalyzing(true);
        setError('');

        try {
            const formData = new FormData();
            images.forEach(image => {
                formData.append('images', image);
            });

            // Pass user profile and language
            if (userProfile) {
                formData.append('userProfile', JSON.stringify(userProfile));
            }
            formData.append('language', language || 'en');

            const data = await identifyPlant(formData);
            setResults(data);
        } catch (err) {
            console.error('Identification error:', err);
            setError(err.message || 'Failed to identify plant. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('results-content');
        downloadPDF(element, `plant-analysis-${Date.now()}.pdf`);
    };

    const handleSaveToHistory = () => {
        saveToHistory('plant', { images: previews, results });
        alert('Saved to history!');
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
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                        <Leaf className="w-10 h-10 text-white" />
                    </div>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Plant Identification
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Upload images of a plant and discover its medicinal properties
                </p>
            </div>

            {/* Upload Section */}
            <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Upload Plant Images
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    For best results, upload 2-3 clear images showing different parts (leaf, flower, stem)
                </p>

                {/* Drop Zone */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                        }`}
                >
                    <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Drag and drop images here
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        or
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                        Browse Files
                    </Button>
                </div>

                {/* Image Previews */}
                {previews.length > 0 && (
                    <div className="mt-6">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Selected Images ({previews.length}/3):
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {previews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                )}

                {/* Identify Button */}
                <div className="mt-6">
                    <Button
                        onClick={handleIdentify}
                        disabled={images.length === 0 || isAnalyzing}
                        className="w-full"
                    >
                        {isAnalyzing ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Identifying...
                            </>
                        ) : (
                            'Identify Plant'
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

                        {/* Plant Information */}
                        <Card className="space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {results.plantName}
                                    </h2>
                                    <Badge variant="success">
                                        {Math.round(results.confidence * 100)}% Match
                                    </Badge>
                                </div>
                                <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-4">
                                    {results.scientificName}
                                </p>

                                {/* Profile Analysis Section */}
                                {results.profileWarning && (
                                    <div className={`mb-6 p-4 rounded-xl border-l-4 ${results.profileWarning.hasWarning
                                            ? (results.profileWarning.severity === 'High' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500')
                                            : 'bg-green-50 dark:bg-green-900/20 border-green-500'
                                        }`}>
                                        <div className="flex items-start gap-3">
                                            {results.profileWarning.hasWarning ? (
                                                <AlertCircle className={`w-6 h-6 flex-shrink-0 ${results.profileWarning.severity === 'High' ? 'text-red-600' : 'text-yellow-600'
                                                    }`} />
                                            ) : (
                                                <div className="w-6 h-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 text-lg">✓</span>
                                                </div>
                                            )}

                                            <div>
                                                <h3 className={`font-bold text-lg mb-1 ${results.profileWarning.hasWarning
                                                        ? (results.profileWarning.severity === 'High' ? 'text-red-700 dark:text-red-400' : 'text-yellow-700 dark:text-yellow-400')
                                                        : 'text-green-700 dark:text-green-400'
                                                    }`}>
                                                    {results.profileWarning.hasWarning
                                                        ? (results.profileWarning.severity === 'High' ? '⚠️ HEALTH WARNING' : '⚠️ CAUTION')
                                                        : '✅ Safe for You'
                                                    }
                                                </h3>
                                                <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">
                                                    {results.profileWarning.hasWarning
                                                        ? results.profileWarning.description
                                                        : "Based on your profile, no known allergies or drug interactions were found with this plant."
                                                    }
                                                </p>

                                                {results.profileWarning.hasWarning && (
                                                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                                                        <span className="opacity-70">Recommendation:</span>
                                                        <span className={results.profileWarning.severity === 'High' ? 'text-red-600' : 'text-yellow-600'}>
                                                            {results.profileWarning.action}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {results.confidence < 0.7 && (
                                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                            ⚠️ Low confidence. Consider uploading more images or consulting an expert.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Identification Reasoning */}
                            {results.identificationReasoning && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        🔍 How We Identified This Plant:
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {results.identificationReasoning}
                                    </p>
                                </div>
                            )}

                            {/* Medicinal Benefits */}
                            {results.medicinalBenefits?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        🌿 Medicinal Benefits:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                        {results.medicinalBenefits.map((benefit, i) => (
                                            <li key={i}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Treats Conditions */}
                            {results.treatsConditions?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        💊 Treats:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {results.treatsConditions.map((condition, i) => (
                                            <Badge key={i} variant="info">{condition}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Preparation Methods */}
                            {results.preparation?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        🧪 Preparation Methods:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                        {results.preparation.map((method, i) => (
                                            <li key={i}>{method}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Dosage */}
                            {results.dosage && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        📏 Recommended Dosage:
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">{results.dosage}</p>
                                </div>
                            )}

                            {/* Side Effects & Warnings */}
                            {(results.sideEffects?.length > 0 || results.warnings?.length > 0) && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg space-y-3">
                                    {results.sideEffects?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                                                ⚠️ Possible Side Effects:
                                            </h3>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 dark:text-red-300">
                                                {results.sideEffects.map((effect, i) => (
                                                    <li key={i}>{effect}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {results.warnings?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                                                🚨 Warnings:
                                            </h3>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 dark:text-red-300">
                                                {results.warnings.map((warning, i) => (
                                                    <li key={i}>{warning}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Alternative Plants */}
                            {results.alternativePlants?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        🔄 Alternative Plants:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {results.alternativePlants.map((plant, i) => (
                                            <Badge key={i} variant="default">{plant}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
