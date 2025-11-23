import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Pill, AlertTriangle, Save, Plus } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/UI';
import { useUser } from '../context/UserContext';

export const Profile = () => {
    const { userProfile, updateProfile, addCondition, removeCondition, addMedication, removeMedication, addAllergy, removeAllergy } = useUser();

    const [newCondition, setNewCondition] = useState('');
    const [newMedication, setNewMedication] = useState('');
    const [newAllergy, setNewAllergy] = useState('');

    const handleAddCondition = () => {
        if (newCondition.trim()) {
            addCondition(newCondition.trim());
            setNewCondition('');
        }
    };

    const handleAddMedication = () => {
        if (newMedication.trim()) {
            addMedication(newMedication.trim());
            setNewMedication('');
        }
    };

    const handleAddAllergy = () => {
        if (newAllergy.trim()) {
            addAllergy(newAllergy.trim());
            setNewAllergy('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                        <User className="w-8 h-8 text-white" />
                    </div>
                </motion.div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    Your Health Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Manage your health data to get personalized AI recommendations and safety checks.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <Card className="glass-card md:col-span-2">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-500" />
                        Personal Details
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Input
                            label="Full Name"
                            value={userProfile.name}
                            onChange={(e) => updateProfile({ name: e.target.value })}
                            placeholder="John Doe"
                        />
                        <Input
                            label="Age"
                            type="number"
                            value={userProfile.age}
                            onChange={(e) => updateProfile({ age: e.target.value })}
                            placeholder="25"
                        />
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Gender</label>
                            <select
                                value={userProfile.gender}
                                onChange={(e) => updateProfile({ gender: e.target.value })}
                                className="input-field"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Medical Conditions */}
                <Card className="glass-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Medical Conditions
                    </h2>
                    <div className="flex gap-2 mb-4">
                        <Input
                            value={newCondition}
                            onChange={(e) => setNewCondition(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCondition()}
                            placeholder="e.g. Diabetes, Asthma"
                            className="bg-white dark:bg-gray-800"
                        />
                        <Button onClick={handleAddCondition} icon={Plus} className="px-3" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {userProfile.conditions.map((condition, i) => (
                            <Badge key={i} variant="danger" className="pl-3 pr-1 py-1">
                                {condition}
                                <button onClick={() => removeCondition(condition)} className="ml-2 p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-full">×</button>
                            </Badge>
                        ))}
                        {userProfile.conditions.length === 0 && (
                            <p className="text-sm text-gray-400 italic">No conditions added</p>
                        )}
                    </div>
                </Card>

                {/* Medications */}
                <Card className="glass-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Pill className="w-5 h-5 text-blue-500" />
                        Current Medications
                    </h2>
                    <div className="flex gap-2 mb-4">
                        <Input
                            value={newMedication}
                            onChange={(e) => setNewMedication(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddMedication()}
                            placeholder="e.g. Aspirin, Metformin"
                            className="bg-white dark:bg-gray-800"
                        />
                        <Button onClick={handleAddMedication} icon={Plus} className="px-3" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {userProfile.medications.map((med, i) => (
                            <Badge key={i} variant="info" className="pl-3 pr-1 py-1">
                                {med}
                                <button onClick={() => removeMedication(med)} className="ml-2 p-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full">×</button>
                            </Badge>
                        ))}
                        {userProfile.medications.length === 0 && (
                            <p className="text-sm text-gray-400 italic">No medications added</p>
                        )}
                    </div>
                </Card>

                {/* Allergies */}
                <Card className="glass-card md:col-span-2">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        Allergies
                    </h2>
                    <div className="flex gap-2 mb-4 max-w-md">
                        <Input
                            value={newAllergy}
                            onChange={(e) => setNewAllergy(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddAllergy()}
                            placeholder="e.g. Peanuts, Penicillin"
                            className="bg-white dark:bg-gray-800"
                        />
                        <Button onClick={handleAddAllergy} icon={Plus} className="px-3" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {userProfile.allergies.map((allergy, i) => (
                            <Badge key={i} variant="warning" className="pl-3 pr-1 py-1">
                                {allergy}
                                <button onClick={() => removeAllergy(allergy)} className="ml-2 p-1 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full">×</button>
                            </Badge>
                        ))}
                        {userProfile.allergies.length === 0 && (
                            <p className="text-sm text-gray-400 italic">No allergies added</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};
