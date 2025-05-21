import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://5r9o22atet2h.share.zrok.io/api/login', {
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
        setError(data.message || 'Invalid credentials');
        return;
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.token);
      document.cookie = `access_token=${data.token}; path=/;`;
      console.log("User successfully logged in")
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setError('Network error. Please try again.');
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
          <h2>Sign In</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              className='login-input'
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className='login-input'
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Log In</button>
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