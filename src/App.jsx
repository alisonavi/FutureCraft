import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import './App.css';
import Navbar from './Reusable components/NavBar';
import FeatureSection from './Main page/FeatureSection';
import ThreeCardsSection from './Main page/ThreeCardsSection';
import Footer from './Reusable components/Footer';
import Carousel from './Main page/Carousel';
import RegisterPage from './Register page/Register';
import HeroSection from './Main page/HeroSection';
import LoginPage from './Login page/Login';
import { AnimatePresence } from 'framer-motion';
import UserProfile from './User Page/UserProfile';
import GameContainer from './Reusable components/GameContainer';
import Explore from './ExplorePaths page/Explore'
import Preference from './PrefenceTest page/Preference'
import PreferencePage from './PrefenceTest page/PreferencePage';
import Contact from './Contact us page/Contact';
import NotFound from './Reusable components/NotFound';
import Terms from './Reusable components/Terms';
import Privacy from './Reusable components/Privacy';
import ForgotPassword from './Login page/ForgotPassword';
import ResetPassword from './Login page/ResetPassword';
import VerifyEmail from './Login page/VerifyEmail';

const App = () => {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Fetch CSRF cookie on app load
    fetch('https://207.127.93.193/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
    }).catch(() => {});
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <Router>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeatureSection />
              <Carousel />
              <ThreeCardsSection />
            </>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/preftest" element={<PreferencePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/game" element={<ProtectedGameRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AnimatePresence />
        <Footer />
      </ToastProvider>
    </Router>
  );
};

function ProtectedGameRoute() {
  const isLoggedIn = !!localStorage.getItem('access_token');
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-primary)' }}>
      <section style={{
        padding: '5.5rem 0 2.5rem 0',
        textAlign: 'center',
        background: 'var(--gradient-primary)',
        borderBottom: '1.5px solid rgba(59, 176, 212, 0.08)',
        marginBottom: '2.5rem',
      }}>
        <h1 style={{
          fontSize: '2.3rem',
          fontWeight: 900,
          background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1.2rem',
          letterSpacing: '-1px',
        }}>FutureCraft Game Arena</h1>
        <p style={{
          color: 'var(--color-gray-100)',
          fontSize: '1.1rem',
          maxWidth: 700,
          margin: '0 auto 0.5rem auto',
          opacity: 0.9,
        }}>
          Dive into our interactive 3D career explorer. Compete, learn, and climb the leaderboard!
        </p>
      </section>
      <GameContainer />
    </div>
  );
}

export default App;