import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('http://10.176.3.43:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword
        })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Registration failed');
        console.log(data)
        return;
      }

      // After successful registration
      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      console.log("User successfully added")
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
      <div className="register-container">
        <div className="register-content">
          <div className="new-user">
            <h2>Create Your Account</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
              <input
                className='register-input'
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className='register-input'
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className='register-input'
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                className='register-input'
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
            <p className="login-link">
              Already a Member? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;