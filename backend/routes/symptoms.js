const express = require('express');
const router = express.Router();
const axios = require('axios');

// Analyze symptoms endpoint
router.post('/analyze', async (req, res) => {
    try {
        const { symptoms, followUpAnswers, userProfile, language } = req.body;

        if (!symptoms || symptoms.length === 0) {
            return res.status(400).json({ error: 'Symptoms are required' });
        }

        // Construct profile context string
        let profileContext = '';
        if (userProfile) {
            profileContext = `
User Profile:
- Age: ${userProfile.age || 'Unknown'}
- Gender: ${userProfile.gender || 'Unknown'}
- Known Conditions: ${userProfile.conditions?.join(', ') || 'None'}
- Current Medications: ${userProfile.medications?.join(', ') || 'None'}
- Allergies: ${userProfile.allergies?.join(', ') || 'None'}

IMPORTANT: Check for any potential conflicts between recommended remedies/plants and the user's medications or conditions. Warn specifically if any exist.
`;
        }

        const prompt = `You are a medical AI assistant. Analyze the following symptoms and provide a detailed health assessment.

Symptoms: ${symptoms.join(', ')}
${followUpAnswers ? `Additional information: ${JSON.stringify(followUpAnswers)}` : ''}
${profileContext}

Provide your response in the following JSON format (ensure all text is in ${language === 'hi' ? 'Hindi' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : 'English'}):
{
  "diseases": [
    {
      "name": "Disease name",
      "confidence": 0-100,
      "reasoning": "Why this disease is likely based on symptoms",
      "riskLevel": "low|moderate|high|emergency",
      "profileAnalysis": {
        "matchScore": "High/Medium/Low",
        "explanation": "Specific reason why this matches the user's profile (e.g., 'Your history of Asthma makes this more likely...')"
      },
      "recommendedPlants": ["Plant 1", "Plant 2"],
      "remedies": ["Remedy 1", "Remedy 2"],
      "preventiveMeasures": ["Measure 1", "Measure 2"],
      "diet": ["Food 1", "Food 2"],
      "exercises": ["Exercise 1", "Exercise 2"]
    }
  ],
  "followUpQuestions": ["Question 1?", "Question 2?"],
  "generalAdvice": "Overall health advice. Include specific warnings if user's profile conflicts with recommendations."
}

Return top 5 most probable diseases. Include a medical disclaimer.`;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: process.env.AI_MODEL || 'x-ai/grok-4.1-fast:free',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful medical AI assistant specializing in symptom analysis and natural remedies. Always include medical disclaimers and recommend professional consultation for serious conditions.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
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

        const responseText = response.data.choices[0].message.content;

        // Try to parse JSON from response
        let result;
        try {
            // Extract JSON from markdown code blocks if present
            const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/);
            const jsonText = jsonMatch ? jsonMatch[1] : responseText;
            result = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            result = {
                diseases: [{
                    name: 'Unable to analyze',
                    confidence: 0,
                    reasoning: 'The AI response could not be parsed. Please try again.',
                    riskLevel: 'moderate',
                    recommendedPlants: [],
                    remedies: [],
                    preventiveMeasures: [],
                    diet: [],
                    exercises: []
                }],
                generalAdvice: responseText
            };
        }

        res.json(result);
    } catch (error) {
        console.error('Error analyzing symptoms:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to analyze symptoms',
            message: error.message
        });
    }
});

module.exports = router;
