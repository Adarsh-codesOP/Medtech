import axios from 'axios';

// Use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Symptom Analysis
export const analyzeSymptoms = async (symptoms, userProfile = {}, language = 'en') => {
    try {
        const response = await api.post('/symptoms/analyze', {
            symptoms,
            userProfile,
            language
        });
        return response.data;
    } catch (error) {
        console.error('Error analyzing symptoms:', error);
        throw error.response?.data?.error || 'Failed to analyze symptoms';
    }
};

// Plant Identification
export const identifyPlant = async (formData) => {
    try {
        const response = await api.post('/plants/identify', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error identifying plant:', error);
        throw error.response?.data?.error || 'Failed to identify plant';
    }
};

// Chatbot
export const chatWithAI = async (message, history = []) => {
    try {
        const response = await api.post('/chat', {
            message,
            history: history.slice(-10), // Send last 10 messages for context
        });
        return response.data;
    } catch (error) {
        console.error('Error chatting with AI:', error);
        return {
            reply: "I'm having trouble connecting to the server right now. Please try again later."
        };
    }
};

export default api;
