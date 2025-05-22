import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingState from '../Reusable components/LoadingState';

const LoginPage = () => {
  // Redirect if already logged in
  if (localStorage.getItem('access_token')) {
    return <Navigate to="/profile" replace />;
  }

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://207.127.93.193/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'skip_zrok_interstitial': 'true',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      document.cookie = `access_token=${data.access_token}; path=/;`;
      window.dispatchEvent(new Event('authchange'));
      setSuccess(true);
      
      // Add a small delay before navigation for better UX
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="login-container">
        <div className="login-content">
          <h2>Welcome Back</h2>
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="error-message"
              >
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="success-message"
              >
                Login successful! Redirecting...
              </motion.p>
            )}
          </AnimatePresence>
          <form onSubmit={handleSubmit}>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              className='login-input'
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              className='login-input'
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <LoadingState message="Signing in..." /> : 'Log In'}
            </motion.button>
          </form>
          <p className="register-link">
            Don't have an account? <Link to="/register">Create One</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;