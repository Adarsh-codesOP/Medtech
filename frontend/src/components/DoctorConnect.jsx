import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, Calendar, MapPin, Phone, ExternalLink, Search } from 'lucide-react';
import { Card, Button, Badge, Input } from './UI';

// Mock database of specialists mapped to conditions
const specialistMap = {
    'skin': 'Dermatologist',
    'rash': 'Dermatologist',
    'acne': 'Dermatologist',
    'fever': 'General Physician',
    'cold': 'General Physician',
    'flu': 'General Physician',
    'viral': 'General Physician',
    'stomach': 'Gastroenterologist',
    'digest': 'Gastroenterologist',
    'heart': 'Cardiologist',
    'breath': 'Pulmonologist',
    'lung': 'Pulmonologist',
    'bone': 'Orthopedic',
    'joint': 'Orthopedic',
    'headache': 'Neurologist',
    'migraine': 'Neurologist',
    'brain': 'Neurologist',
    'eye': 'Ophthalmologist',
    'ear': 'ENT Specialist',
    'throat': 'ENT Specialist',
    'tooth': 'Dentist',
    'teeth': 'Dentist',
};

export const DoctorConnect = ({ diseaseName, symptoms }) => {
    const [city, setCity] = useState('Bangalore'); // Default city

    // Determine specialty based on disease name or symptoms
    const getSpecialty = () => {
        const text = (diseaseName + ' ' + symptoms.join(' ')).toLowerCase();
        for (const [key, value] of Object.entries(specialistMap)) {
            if (text.includes(key)) return value;
        }
        return 'General Physician';
    };

    const recommendedSpecialty = getSpecialty();

    const handlePractoSearch = () => {
        // Construct the query object to match Practo's expected format
        const queryObject = [{
            word: recommendedSpecialty,
            autocompleted: true,
            category: "subspeciality"
        }];

        const queryString = JSON.stringify(queryObject);
        const location = city.trim().toLowerCase();

        // Use the exact URL structure provided
        const url = `https://www.practo.com/search/doctors?q=${encodeURIComponent(queryString)}&city=${encodeURIComponent(location)}&results_type=doctor`;
        window.open(url, '_blank');
    };

    return (
        <div className="space-y-6 mt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Find a Specialist
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Based on your analysis, we recommend seeing a <strong>{recommendedSpecialty}</strong>
                    </p>
                </div>
                <Badge variant="info" className="px-4 py-2 text-lg self-start md:self-center">
                    {recommendedSpecialty}
                </Badge>
            </div>

            <Card className="glass-card border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Enter your City
                        </label>
                        <Input
                            icon={MapPin}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Mumbai, Delhi, New York"
                            className="bg-white dark:bg-gray-800"
                        />
                    </div>
                    <Button
                        onClick={handlePractoSearch}
                        className="w-full md:w-auto bg-[#1d4ed8] hover:bg-[#1e40af]"
                        icon={Search}
                    >
                        Find on Practo
                    </Button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <ExternalLink className="w-4 h-4" />
                    <span>Redirects to Practo.com for verified doctor listings near you</span>
                </div>
            </Card>

            {/* Mock Featured Doctors (Optional - can keep or remove based on preference) */}
            <div className="opacity-75">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Featured Specialists (Demo)
                </p>
                {/* ... existing mock cards logic could go here if we wanted to keep them as "Sponsored" or similar, 
                    but for now let's focus on the Practo integration as the main feature. 
                    I'll remove the mock list to keep it clean and focused on the real Practo search. */}
            </div>
        </div>
    );
};
