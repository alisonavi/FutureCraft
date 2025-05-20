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
import GameContainer from './Reusable components/GameContainer';
import Explore from './ExplorePaths page/Explore'
import Preference from './PrefenceTest page/Preference'
import PreferencePage from './PrefenceTest page/PreferencePage';

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
            <GameContainer />
          </>
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/preftest" element={<PreferencePage />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <AnimatePresence />
      <Footer />
    </Router>
  );
}
export default App;