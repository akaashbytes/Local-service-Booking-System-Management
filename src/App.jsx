import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/context/ThemeContext';
import { AuthProvider } from './components/context/AuthContext';
import './styles/globals.css';

// Landing page components
import Navbar from './components/layout/Navbar';
import HeroSection from './components/common/HeroSection';
import StatsSection from './components/common/StatsSection';
import ServicesSection from './components/common/ServicesSection';
import CTASection from './components/common/CTASection';
import Footer from './components/layout/Footer';
import LoginPage from './pages/auth/LoginPage';


function LandingPage() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}