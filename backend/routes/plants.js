const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'plant-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Identify plant endpoint
router.post('/identify', upload.array('images', 3), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        // Convert images to base64
        const imageContents = req.files.map(file => {
            const imageBuffer = fs.readFileSync(file.path);
            const base64Image = imageBuffer.toString('base64');
            return {
                type: 'image_url',
                image_url: {
                    url: `data:${file.mimetype};base64,${base64Image}`
                }
            };
        });

        // Construct profile context
        let profileContext = '';
        let userProfile = {};
        try {
            console.log('Received body:', req.body); // Debug log
            if (req.body.userProfile) {
                userProfile = JSON.parse(req.body.userProfile);
                console.log('Parsed User Profile:', userProfile); // Debug log

                profileContext = `
User Profile for Safety Check:
- Allergies: ${userProfile.allergies?.join(', ') || 'None'}
- Current Medications: ${userProfile.medications?.join(', ') || 'None'}
- Medical Conditions: ${userProfile.conditions?.join(', ') || 'None'}

CRITICAL SAFETY INSTRUCTION:
You MUST cross-reference the identified plant with the User Profile above.
1. Check for ALLERGIES: Is the user allergic to this plant, its family, or its compounds?
2. Check for DRUG INTERACTIONS: Does this plant interact with ${userProfile.medications?.join(', ') || 'any medications'}? (e.g., Ginger/Garlic + Warfarin/Blood Thinners is a MAJOR RISK).
3. Check for CONDITIONS: Is this plant contraindicated for ${userProfile.conditions?.join(', ') || 'any conditions'}?

If ANY risk is found, you MUST set "hasWarning": true in the JSON response and provide a severe warning.
`;
            } else {
                console.log('No user profile found in request body');
            }
        } catch (e) {
            console.error('Error parsing user profile:', e);
        }

        const language = req.body.language || 'en';
        const langName = language === 'hi' ? 'Hindi' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : 'English';

        const prompt = `Identify this plant from the image and provide detailed medicinal information.
${profileContext}

Provide the response in the following JSON format (ensure all text is in ${langName}):
{
  "plantName": "Common Name",
  "scientificName": "Scientific Name",
  "confidence": 0.0-1.0,
  "identificationReasoning": "Brief explanation of visual features",
  "medicinalBenefits": ["Benefit 1", "Benefit 2"],
  "treatsConditions": ["Condition 1", "Condition 2"],
  "preparation": ["Prep method 1", "Prep method 2"],
  "dosage": "Recommended dosage",
  "sideEffects": ["Side effect 1", "Side effect 2"],
  "warnings": ["General warning 1", "General warning 2"],
  "profileWarning": {
    "hasWarning": boolean,
    "type": "Allergy" | "Interaction" | "Condition" | "None",
    "severity": "High" | "Moderate" | "Low" | "None",
    "description": "Specific warning based on user profile. E.g., 'DANGEROUS: You are taking Warfarin, and this plant contains Vitamin K...'",
    "action": "What the user should do (e.g., 'Avoid completely')"
  },
  "alternativePlants": ["Alt Plant 1", "Alt Plant 2"]
}`;

        // We'll use google/gemini-2.0-flash-exp:free as a safe default for vision on OpenRouter
        const visionModel = 'google/gemini-2.0-flash-exp:free';

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: visionModel,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a botanical expert specializing in medicinal plants. Provide accurate identification and comprehensive medicinal information.'
                    },
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: prompt },
                            ...imageContents
                        ]
                    }
                ]
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

        // Parse JSON response
        let result;
        try {
            const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/);
            const jsonText = jsonMatch ? jsonMatch[1] : responseText;
            result = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            console.log('Raw AI Response:', responseText);
            result = {
                plantName: 'Unknown',
                scientificName: 'Unable to identify',
                confidence: 0,
                identificationReasoning: 'The AI response could not be parsed. Please try again with clearer images.',
                medicinalBenefits: [],
                preparation: [],
                dosage: '',
                sideEffects: [],
                warnings: ['Unable to identify plant. Do not consume unknown plants.'],
                alternativePlants: [],
                treatsConditions: []
            };
        }

        // Clean up uploaded files
        req.files.forEach(file => {
            fs.unlinkSync(file.path);
        });

        res.json(result);
    } catch (error) {
        console.error('Error identifying plant:', error.message);
        if (error.response) {
            console.error('OpenRouter API Error Data:', JSON.stringify(error.response.data, null, 2));
            console.error('OpenRouter API Error Status:', error.response.status);
        }

        // Clean up uploaded files on error
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        }

        res.status(500).json({
            error: 'Failed to identify plant',
            message: error.message,
            details: error.response?.data || 'No additional details'
        });
    }
});

module.exports = router;
