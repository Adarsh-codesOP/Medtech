import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    // Initialize state from localStorage or defaults
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            name: '',
            age: '',
            gender: '',
            conditions: [],
            medications: [],
            allergies: []
        };
    });

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || 'en';
    });

    // Persist profile changes
    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile]);

    // Persist language changes
    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    const updateProfile = (newData) => {
        setUserProfile(prev => ({ ...prev, ...newData }));
    };

    const addCondition = (condition) => {
        if (!userProfile.conditions.includes(condition)) {
            updateProfile({ conditions: [...userProfile.conditions, condition] });
        }
    };

    const removeCondition = (condition) => {
        updateProfile({ conditions: userProfile.conditions.filter(c => c !== condition) });
    };

    const addMedication = (medication) => {
        if (!userProfile.medications.includes(medication)) {
            updateProfile({ medications: [...userProfile.medications, medication] });
        }
    };

    const removeMedication = (medication) => {
        updateProfile({ medications: userProfile.medications.filter(m => m !== medication) });
    };

    const addAllergy = (allergy) => {
        if (!userProfile.allergies.includes(allergy)) {
            updateProfile({ allergies: [...userProfile.allergies, allergy] });
        }
    };

    const removeAllergy = (allergy) => {
        updateProfile({ allergies: userProfile.allergies.filter(a => a !== allergy) });
    };

    return (
        <UserContext.Provider value={{
            userProfile,
            updateProfile,
            language,
            setLanguage,
            addCondition,
            removeCondition,
            addMedication,
            removeMedication,
            addAllergy,
            removeAllergy
        }}>
            {children}
        </UserContext.Provider>
    );
};
