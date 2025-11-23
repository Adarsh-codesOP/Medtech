import { clsx } from 'clsx';

export function cn(...inputs) {
    return clsx(inputs);
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getRiskColor = (riskLevel) => {
    const colors = {
        low: 'success',
        moderate: 'warning',
        high: 'danger',
        emergency: 'danger',
    };
    return colors[riskLevel?.toLowerCase()] || 'default';
};

export const getRiskIcon = (riskLevel) => {
    const icons = {
        low: '✓',
        moderate: '⚠',
        high: '⚠',
        emergency: '🚨',
    };
    return icons[riskLevel?.toLowerCase()] || '•';
};

export const downloadPDF = async (element, filename) => {
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
};

export const saveToHistory = (type, data) => {
    const history = JSON.parse(localStorage.getItem(`${type}History`) || '[]');
    const newEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        data,
    };
    history.unshift(newEntry);
    localStorage.setItem(`${type}History`, JSON.stringify(history.slice(0, 50))); // Keep last 50
    return newEntry;
};

export const getHistory = (type) => {
    return JSON.parse(localStorage.getItem(`${type}History`) || '[]');
};

export const deleteHistoryItem = (type, id) => {
    const history = getHistory(type);
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(`${type}History`, JSON.stringify(filtered));
};

export const clearHistory = (type) => {
    localStorage.removeItem(`${type}History`);
};

export const speakText = (text) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
};

export const startVoiceRecognition = (onResult, onError) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        onError?.('Voice recognition not supported in this browser');
        return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult?.(transcript);
    };

    recognition.onerror = (event) => {
        onError?.(event.error);
    };

    recognition.start();
    return recognition;
};
