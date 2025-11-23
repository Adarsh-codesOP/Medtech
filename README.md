# 🌿 MedTech AI - Your Personal Health Assistant

> **AI-Powered Symptom Analysis & Medicinal Plant Identification**

![MedTech AI Banner]((https://github.com/Adarsh-codesOP/Medtech/blob/main/frontend/public/banner.png))

<div align="center">

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-7F52FF?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)

</div>

---

## 📖 Overview

**MedTech AI** is a cutting-edge web application designed to bridge the gap between modern AI technology and traditional natural medicine. It empowers users to take control of their health by providing instant, AI-driven analysis of symptoms and identifying medicinal plants from simple images.

With a focus on **safety and personalization**, MedTech AI checks every recommendation against your unique health profile—warning you of potential allergies or drug interactions before you try any remedy.

---

## ✨ Key Features

### 🩺 **AI Symptom Checker**
- **Instant Analysis**: Describe your symptoms in plain English or use voice input.
- **Disease Prediction**: Advanced AI models (Grok-4.1) analyze symptoms to suggest potential conditions.
- **Risk Assessment**: Immediate risk level indicators (Low, Moderate, High) with actionable advice.
- **Profile Relevance**: See how each condition relates to your specific health profile.
- **Doctor Connect**: Find nearby specialists based on your predicted condition.

### 🌱 **Medicinal Plant Identifier**
- **Visual Recognition**: Upload photos of any plant to identify it instantly using Gemini Vision AI.
- **Detailed Insights**: Get scientific names, medicinal benefits, preparation methods, and dosage.
- **Safety First**:
    - **Allergy Alerts**: Warns if you are allergic to the identified plant.
    - **Interaction Checks**: Checks for conflicts with your current medications (e.g., Warfarin + Ginger).
    - **Condition Warnings**: Advises against plants that may worsen your existing conditions.

### 💬 **Health Chatbot**
- **24/7 Assistant**: Ask follow-up questions about your diagnosis or plant remedies.
- **Context-Aware**: The AI remembers your previous interactions and health profile for personalized answers.
- **Multi-Language**: Chat in English, Hindi, Spanish, or French.

### 👤 **Personalized Health Profile**
- **Secure Storage**: Your health data (allergies, medications, conditions) is stored **locally** on your device for privacy.
- **Smart Integration**: Your profile is automatically used to tailor all AI responses and safety warnings.

---

## 🚀 Tech Stack

### **Frontend**
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS + Framer Motion (Animations)
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios

### **Backend**
- **Server**: Node.js + Express
- **AI Integration**: OpenRouter API
    - **Symptom Analysis**: `x-ai/grok-4.1-fast`
    - **Plant Vision**: `google/gemini-2.0-flash-exp`
    - **Chat**: `x-ai/grok-4.1-fast`
- **File Handling**: Multer (for image uploads)

---

## 🛠️ Installation & Setup

Follow these steps to get MedTech AI running on your local machine.

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **OpenRouter API Key** (Get one at [openrouter.ai](https://openrouter.ai))

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/medtech-ai.git
cd medtech-ai
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```
**Configure `.env`**:
Open `backend/.env` and add your API key:
```env
PORT=3000
OPENAI_API_KEY=sk-or-v1-your-actual-api-key-here
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
```
**Configure `.env`**:
Open `frontend/.env` and ensure the API URL matches your backend:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Run the Application
You need to run both the backend and frontend servers.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to start using MedTech AI! 🚀

---

## 📸 Screenshots

| **Home Page** | **Symptom Checker** |
|:---:|:---:|
| ![Home](https://via.placeholder.com/400x200/e5e7eb/1f2937?text=Home+Page) | ![Symptom Checker](https://via.placeholder.com/400x200/e5e7eb/1f2937?text=Symptom+Analysis) |

| **Plant Identifier** | **Profile Warnings** |
|:---:|:---:|
| ![Plant ID](https://via.placeholder.com/400x200/e5e7eb/1f2937?text=Plant+Identification) | ![Warnings](https://via.placeholder.com/400x200/fee2e2/991b1b?text=Safety+Alerts) |

---

## 🤝 Contributing

Contributions are welcome! This is an academic project, but we love community input.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- **OpenRouter** for providing access to top-tier AI models.
- **React Community** for the amazing ecosystem.
- **Google DeepMind** & **xAI** for the underlying AI technologies.

---

<div align="center">
  <sub>Built with ❤️ by Adarsh & Team</sub>
</div>
