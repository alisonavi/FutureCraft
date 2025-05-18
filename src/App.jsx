import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import UnityGame from './Reusable components/UnityGame';
import Explore from './ExplorePaths page/Explore'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <FeatureSection />
            <Carousel />
            <ThreeCardsSection />
            <UnityGame />
          </>
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/preferencetest" element={<Explore />} />
      </Routes>
      <AnimatePresence />
      <Footer />
    </Router>
  );
}
export default App;