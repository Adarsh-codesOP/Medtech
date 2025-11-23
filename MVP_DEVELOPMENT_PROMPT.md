# 🎓 AI-Powered Symptom + Medicinal Plant Assistant - MVP Development Prompt

## Project Type: Academic Major Project

---

## 📋 Project Overview

Build a comprehensive web application that combines AI-powered symptom analysis with medicinal plant identification. This is an academic project requiring full documentation, testing, and demonstration capabilities.

---

## 🎯 Core MVP Features (Must Have)

### 1. **Symptom Analysis System**
- Multi-symptom input interface (tag-based input)
- AI-powered disease prediction using LLM
- Return top 5 probable diseases with:
  - Disease name
  - Confidence percentage (0-100%)
  - Reasoning/explanation
  - Risk level (Low/Moderate/High/Emergency)
  - Recommended medicinal plants
  - Home remedies
  - Preventive measures
  - Diet recommendations
  - Exercise suggestions

### 2. **Medicinal Plant Identification**
- Image upload functionality (drag & drop + file picker)
- AI Vision-based plant recognition
- Return plant information:
  - Plant name (common + scientific)
  - Confidence score
  - Medicinal benefits
  - Preparation methods (tea, paste, powder, oil)
  - Dosage instructions
  - Side effects/warnings
  - Alternative plants

### 3. **AI Health Chatbot**
- Conversational interface
- Context-aware responses
- Health and medicinal plant queries
- Typing animation
- Chat history (session-based)

### 4. **User History**
- Save symptom check results
- Save plant identification results
- Display with timestamps
- Delete individual entries
- Clear all history option

### 5. **PDF Report Generation**
- One-click download
- Professional formatting
- Include all analysis results
- Timestamp and disclaimer

---

## 🌟 Enhanced Features (Academic Value-Add)

### 6. **Interactive Follow-up Questions**
- AI asks clarifying questions based on symptoms
- "How long have you had these symptoms?"
- "Any additional symptoms?"
- Improves diagnostic accuracy

### 7. **Health Risk Scoring**
- Visual risk indicator (color-coded)
- Emergency alert for high-risk conditions
- Recommendation to seek medical help

### 8. **Plant-to-Disease Mapping**
- Automatic cross-referencing
- If disease detected → show relevant medicinal plants
- If plant identified → show what diseases it treats

### 9. **Voice Input for Symptoms**
- Web Speech API integration
- Speak symptoms instead of typing
- Accessibility feature

### 10. **Multi-Image Plant Analysis**
- Upload multiple angles (leaf, flower, stem)
- Improved identification accuracy
- AI explains identification reasoning

### 11. **Light/Dark Mode**
- Theme toggle
- Persistent preference
- Modern UI aesthetic

---

## 🏗️ Technical Architecture

### **Frontend Stack**
```
- React 18+ (component-based architecture)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations)
- React Router (navigation)
- Axios (API calls)
- html2pdf.js (PDF generation)
- Web Speech API (voice input)
```

### **Backend Stack**
```
Option 1: Node.js + Express
- Express.js (REST API)
- MongoDB/PostgreSQL (database)
- Mongoose/Sequelize (ORM)
- Multer (file uploads)
- dotenv (environment variables)

Option 2: Python + FastAPI
- FastAPI (async REST API)
- MongoDB/PostgreSQL (database)
- Motor/SQLAlchemy (ORM)
- Python-multipart (file uploads)
- python-dotenv (environment variables)
```

### **AI Services**
```
Symptom Analysis (Choose one):
- OpenAI GPT-4/GPT-3.5
- Anthropic Claude
- Groq (LLaMA 3)
- Google Gemini

Plant Identification (Choose one):
- OpenAI Vision API
- Google Cloud Vision API
- Custom CLIP-based model
```

### **Database Schema**
```javascript
// Users Collection (optional for MVP)
{
  _id: ObjectId,
  name: String,
  email: String,
  createdAt: Date
}

// SymptomChecks Collection
{
  _id: ObjectId,
  userId: ObjectId (optional),
  sessionId: String,
  symptoms: [String],
  result: {
    diseases: [{
      name: String,
      confidence: Number,
      reasoning: String,
      riskLevel: String,
      recommendedPlants: [String],
      remedies: [String],
      preventiveMeasures: [String],
      diet: [String],
      exercises: [String]
    }],
    followUpQuestions: [String]
  },
  timestamp: Date
}

// PlantIdentifications Collection
{
  _id: ObjectId,
  userId: ObjectId (optional),
  sessionId: String,
  imageUrl: String,
  result: {
    plantName: String,
    scientificName: String,
    confidence: Number,
    benefits: [String],
    preparation: [String],
    dosage: String,
    sideEffects: [String],
    alternativePlants: [String],
    reasoning: String
  },
  timestamp: Date
}

// ChatHistory Collection
{
  _id: ObjectId,
  userId: ObjectId (optional),
  sessionId: String,
  messages: [{
    role: String, // 'user' or 'assistant'
    content: String,
    timestamp: Date
  }]
}

// MedicinalPlants Reference Database
{
  _id: ObjectId,
  commonName: String,
  scientificName: String,
  treatsConditions: [String],
  benefits: [String],
  preparation: [String],
  dosage: String,
  sideEffects: [String],
  imageUrls: [String]
}
```

---

## 🎨 UI/UX Requirements

### **Design Principles**
- **Modern & Premium**: Vibrant colors, gradients, glassmorphism
- **Accessible**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design
- **Intuitive**: Clear user flows, minimal clicks
- **Trustworthy**: Medical disclaimers, professional appearance

### **Color Palette**
```css
/* Light Mode */
--primary: #10b981 (green - healing/nature)
--secondary: #3b82f6 (blue - trust/medical)
--accent: #f59e0b (orange - energy/warmth)
--background: #f9fafb
--surface: #ffffff
--text: #111827
--error: #ef4444
--success: #10b981
--warning: #f59e0b

/* Dark Mode */
--primary: #34d399
--secondary: #60a5fa
--accent: #fbbf24
--background: #111827
--surface: #1f2937
--text: #f9fafb
```

### **Page Structure**

#### **1. Home Page**
```
- Hero section with gradient background
- Tagline: "AI-Powered Health Insights & Medicinal Plant Discovery"
- Two primary CTAs:
  - "Check Symptoms" (prominent)
  - "Identify Plant" (prominent)
- Features overview (3-4 cards)
- How it works section
- Footer with disclaimer
```

#### **2. Symptom Checker Page**
```
- Page title: "Symptom Analysis"
- Symptom input area:
  - Tag-based multi-select
  - Voice input button
  - Suggested common symptoms
- "Analyze Symptoms" button (disabled until input)
- Loading state with animation
- Results card:
  - Disease predictions (expandable cards)
  - Risk level badge
  - Recommended plants section
  - Remedies & prevention
  - Diet & exercise tips
  - "Download PDF" button
  - "Save to History" button
```

#### **3. Plant Identifier Page**
```
- Page title: "Plant Identification"
- Upload area:
  - Drag & drop zone
  - File picker button
  - Multi-image support
  - Image preview
- "Identify Plant" button
- Loading state with leaf animation
- Results card:
  - Plant name (common + scientific)
  - Confidence meter
  - Benefits list
  - Preparation methods
  - Dosage & warnings
  - "Download PDF" button
  - "Save to History" button
```

#### **4. Chatbot Page**
```
- Chat interface (WhatsApp-style)
- Message bubbles (user vs AI)
- Typing indicator
- Input field with send button
- Suggested quick questions
- "Clear chat" option
```

#### **5. History Page**
```
- Tabs: "Symptom Checks" | "Plant IDs"
- List view with cards:
  - Timestamp
  - Summary
  - "View Details" button
  - "Delete" button
- "Clear All History" button
- Empty state illustration
```

#### **6. Settings Page**
```
- Theme toggle (Light/Dark)
- Clear history
- About section
- Disclaimer
- Contact/Feedback
```

---

## 🔌 API Endpoints

### **Backend REST API**

```javascript
// Symptom Analysis
POST /api/symptoms/analyze
Body: {
  symptoms: ["fever", "headache", "fatigue"],
  followUpAnswers: {} // optional
}
Response: {
  diseases: [...],
  followUpQuestions: [...],
  riskLevel: "moderate"
}

// Plant Identification
POST /api/plants/identify
Body: FormData {
  images: [File, File, ...],
  location: "optional"
}
Response: {
  plantName: "Neem",
  scientificName: "Azadirachta indica",
  confidence: 0.92,
  benefits: [...],
  ...
}

// Chatbot
POST /api/chat
Body: {
  message: "What helps with headaches?",
  sessionId: "uuid",
  history: [...] // optional
}
Response: {
  reply: "...",
  suggestions: [...]
}

// History
GET /api/history/symptoms?sessionId=uuid
GET /api/history/plants?sessionId=uuid
DELETE /api/history/:id
DELETE /api/history/clear?sessionId=uuid

// PDF Generation
POST /api/generate-pdf
Body: {
  type: "symptom" | "plant",
  data: {...}
}
Response: {
  pdfUrl: "..."
}
```

---

## 🧪 Testing Requirements

### **Unit Tests**
- Test API endpoint handlers
- Test utility functions (symptom parser, confidence calculator)
- Test React components (snapshot tests)

### **Integration Tests**
- Test complete symptom analysis flow
- Test plant identification flow
- Test chatbot conversation flow
- Test PDF generation

### **User Acceptance Testing**
- 20-30 test users
- Feedback forms (Google Forms)
- Metrics to collect:
  - System Usability Scale (SUS) score
  - Accuracy perception
  - Feature usefulness ratings
  - Suggestions for improvement

### **Accuracy Validation**
- Test symptom checker with known medical cases
- Test plant identifier with labeled plant images
- Document accuracy rates in project report

---

## 📊 AI Prompt Engineering

### **Symptom Analysis Prompt Template**
```
You are a medical AI assistant. Analyze the following symptoms and provide a detailed health assessment.

Symptoms: {symptomsList}

Provide your response in the following JSON format:
{
  "diseases": [
    {
      "name": "Disease name",
      "confidence": 0-100,
      "reasoning": "Why this disease is likely based on symptoms",
      "riskLevel": "low|moderate|high|emergency",
      "recommendedPlants": ["Plant 1", "Plant 2"],
      "remedies": ["Remedy 1", "Remedy 2"],
      "preventiveMeasures": ["Measure 1", "Measure 2"],
      "diet": ["Food 1", "Food 2"],
      "exercises": ["Exercise 1", "Exercise 2"]
    }
  ],
  "followUpQuestions": ["Question 1?", "Question 2?"],
  "generalAdvice": "Overall health advice"
}

Return top 5 most probable diseases. Include a medical disclaimer.
```

### **Plant Identification Prompt Template**
```
You are a botanical AI expert specializing in medicinal plants. Analyze the provided plant image(s) and identify the plant.

Provide your response in JSON format:
{
  "plantName": "Common name",
  "scientificName": "Scientific name",
  "confidence": 0-100,
  "identificationReasoning": "Why this plant was identified (leaf shape, color, etc.)",
  "medicinalBenefits": ["Benefit 1", "Benefit 2"],
  "preparation": ["Method 1", "Method 2"],
  "dosage": "Recommended dosage",
  "sideEffects": ["Side effect 1", "Side effect 2"],
  "warnings": ["Warning 1", "Warning 2"],
  "alternativePlants": ["Plant 1", "Plant 2"],
  "treatsConditions": ["Condition 1", "Condition 2"]
}

If confidence is below 70%, suggest uploading more images or consulting an expert.
```

### **Chatbot System Prompt**
```
You are a helpful health and medicinal plant assistant. You provide:
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
- Replace professional medical advice
```

---

## 🚀 Development Workflow

### **Phase 1: Setup (Week 1)**
```bash
# Frontend
npx create-react-app medtech-assistant
cd medtech-assistant
npm install tailwindcss framer-motion react-router-dom axios html2pdf.js

# Backend (Node.js example)
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors multer openai

# Project structure
medtech-assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   └── public/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   └── server.js
└── docs/
    ├── project-report.md
    └── diagrams/
```

### **Phase 2: Core Development (Week 2-6)**
1. **Week 2**: Symptom checker UI + backend
2. **Week 3**: Plant identifier UI + backend
3. **Week 4**: Chatbot + history features
4. **Week 5**: PDF generation + voice input
5. **Week 6**: Polish, dark mode, responsive design

### **Phase 3: Testing (Week 7-8)**
- Write test cases
- Conduct user testing
- Fix bugs
- Optimize performance

### **Phase 4: Documentation (Week 9-10)**
- Write project report
- Create UML diagrams
- Prepare presentation
- Record demo video

---

## 📚 Academic Documentation Requirements

### **Project Report Sections**
1. Abstract
2. Introduction (problem statement, objectives)
3. Literature Review (existing systems, technologies)
4. System Analysis (requirements, feasibility)
5. System Design (architecture, database, UI/UX)
6. Implementation (tech stack, modules, code snippets)
7. Testing (test cases, results, accuracy metrics)
8. Results & Discussion
9. Conclusion & Future Work
10. References
11. Appendices (code, user manual, test data)

### **UML Diagrams to Create**
- Use Case Diagram
- Class Diagram
- Sequence Diagrams (symptom check, plant ID)
- Activity Diagrams
- ER Diagram (database)
- Component Diagram
- Deployment Diagram

---

## ⚠️ Important Considerations

### **Medical Disclaimer**
```
IMPORTANT DISCLAIMER:
This application is for educational and informational purposes only.
It is NOT a substitute for professional medical advice, diagnosis, or treatment.
Always seek the advice of your physician or qualified health provider
with any questions regarding a medical condition.
In case of emergency, call your local emergency services immediately.
```

### **Data Privacy**
- No personal health information stored permanently (unless user opts in)
- Session-based storage with auto-expiry
- GDPR-compliant data handling
- Clear privacy policy

### **Ethical AI Use**
- Transparent AI limitations
- Confidence thresholds (don't show low-confidence results)
- Emergency condition detection → immediate medical referral
- Source citations for medical information

---

## 🎯 Success Metrics

### **Technical Metrics**
- Symptom analysis response time: < 5 seconds
- Plant identification accuracy: > 80%
- System uptime: > 95%
- Mobile responsiveness: All features work on mobile

### **Academic Metrics**
- Complete documentation (80+ pages)
- All UML diagrams created
- 20+ test cases executed
- User testing with 20+ participants
- Working demo for presentation

### **User Experience Metrics**
- SUS score: > 70 (acceptable)
- Feature satisfaction: > 4/5
- Would recommend: > 70%

---

## 🔮 Future Enhancements (Post-MVP)

1. **Multi-language support** (Hindi, Spanish, etc.)
2. **Offline mode** (PWA with cached plant database)
3. **AR plant scanner** (real-time identification)
4. **Community features** (user-contributed plant photos)
5. **Integration with wearables** (symptom tracking)
6. **Personalized health plans** (based on history)
7. **Video consultations** (with herbalists/doctors)
8. **Mobile app** (React Native version)

---

## 📝 Deliverables Checklist

- [ ] Working web application (deployed)
- [ ] Source code (GitHub repository)
- [ ] Project report (PDF, 80+ pages)
- [ ] Presentation slides (PPT/PDF)
- [ ] Demo video (5-10 minutes)
- [ ] User manual (PDF)
- [ ] Test documentation (test cases + results)
- [ ] UML diagrams (all types)
- [ ] Project poster (for exhibition)

---

## 🎓 Evaluation Criteria

| Component | Weightage | Key Points |
|-----------|-----------|------------|
| Working System | 25% | All features functional, no critical bugs |
| Project Report | 30% | Comprehensive, well-structured, technical depth |
| Presentation | 20% | Clear communication, live demo, Q&A handling |
| Innovation | 10% | Unique features, novel approach |
| Testing | 10% | Thorough test coverage, accuracy validation |
| Documentation | 5% | Code comments, user manual, diagrams |

---

## 🚀 Quick Start Command

```bash
# Use this prompt with an AI coding assistant:
"Build an AI-powered symptom checker and medicinal plant identifier web application 
following the specifications in MVP_DEVELOPMENT_PROMPT.md. Start with project setup, 
then implement the symptom checker, plant identifier, chatbot, and history features. 
Use React + Tailwind for frontend, Node.js + Express for backend, and OpenAI APIs 
for AI functionality. Include all academic documentation requirements."
```

---

## 📞 Support & Resources

### **AI API Documentation**
- OpenAI: https://platform.openai.com/docs
- Google Vision: https://cloud.google.com/vision/docs
- Anthropic Claude: https://docs.anthropic.com

### **Medical Databases**
- WHO Traditional Medicine: https://www.who.int/health-topics/traditional-complementary-and-integrative-medicine
- NIH Herbs: https://www.nccih.nih.gov/health/herbsataglance
- PubMed: https://pubmed.ncbi.nlm.nih.gov/

### **Plant Databases**
- USDA Plants Database: https://plants.usda.gov
- The Plant List: http://www.theplantlist.org
- Medicinal Plant Names Services: https://mpns.science.kew.org

---

**Project Timeline**: 10-12 weeks  
**Difficulty Level**: Advanced  
**Team Size**: 2-4 members (or solo)  
**Budget**: $50-100 (for AI API credits)

---

*Good luck with your major project! 🌿✨*
