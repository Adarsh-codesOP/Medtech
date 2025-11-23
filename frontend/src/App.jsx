import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SymptomChecker } from './pages/SymptomChecker';
import { PlantIdentifier } from './pages/PlantIdentifier';
import { Chatbot } from './pages/Chatbot';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { InteractionChecker } from './pages/InteractionChecker';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/plants" element={<PlantIdentifier />} />
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/interactions" element={<InteractionChecker />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
