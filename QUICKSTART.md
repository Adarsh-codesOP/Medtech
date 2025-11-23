# 🚀 Quick Start Guide - MedTech AI

## Prerequisites
- Node.js 18+ installed
- OpenAI API key

## Setup Steps

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Configure Environment Variables

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

**Backend** - Create `backend/.env`:
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGIN=http://localhost:5173
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Access the Application

Open your browser to: **http://localhost:5173**

## Demo Mode

The application includes fallback mock data, so you can test the UI without an OpenAI API key. However, for full AI functionality, you'll need to:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to `backend/.env`
3. Restart the backend server

## Features to Test

✅ **Symptom Checker** - Enter symptoms like "fever, headache, cough"  
✅ **Plant Identifier** - Upload plant images (works with mock data)  
✅ **Chatbot** - Ask health-related questions  
✅ **History** - View saved analyses  
✅ **Dark Mode** - Toggle theme in settings  

## Troubleshooting

**Port already in use?**
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` accordingly

**API errors?**
- Check your OpenAI API key
- Ensure backend is running
- Check browser console for errors

## Next Steps

- Review the full [README.md](../README.md) for detailed documentation
- Check [MVP_DEVELOPMENT_PROMPT.md](../MVP_DEVELOPMENT_PROMPT.md) for project specifications
- Explore the code structure and customize as needed

---

**Need help?** Check the console logs for detailed error messages.
