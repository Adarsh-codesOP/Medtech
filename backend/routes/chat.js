const express = require('express');
const router = express.Router();
const axios = require('axios');

// Chat endpoint
router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build conversation history
        const messages = [
            {
                role: 'system',
                content: `You are a helpful health and medicinal plant assistant. You provide:
- Information about symptoms and diseases
- Medicinal plant knowledge
- Herbal remedy suggestions
- General wellness advice

Guidelines:
- Always include medical disclaimers
- Recommend professional medical help for serious conditions
- Be empathetic and supportive
- Provide evidence-based information
- Keep responses concise (2-3 paragraphs max)
- Use simple, non-technical language

Never:
- Provide definitive diagnoses
- Prescribe medications
- Replace professional medical advice`
            }
        ];

        // Add conversation history
        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                const messageObj = {
                    role: msg.role,
                    content: msg.content
                };
                // Preserve reasoning_details if present
                if (msg.reasoning_details) {
                    messageObj.reasoning_details = msg.reasoning_details;
                }
                messages.push(messageObj);
            });
        }

        // Add current message
        messages.push({
            role: 'user',
            content: message
        });

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: process.env.AI_MODEL || 'x-ai/grok-4.1-fast:free',
                messages: messages,
                reasoning: { enabled: true }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'MedTech AI',
                }
            }
        );

        const assistantMessage = response.data.choices[0].message;

        res.json({
            reply: assistantMessage.content,
            reasoning_details: assistantMessage.reasoning_details, // Send back reasoning details
            suggestions: []
        });
    } catch (error) {
        console.error('Error in chat:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to process chat message',
            message: error.message
        });
    }
});

module.exports = router;
