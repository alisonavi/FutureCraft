import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your registration API endpoint
      const response = await fetch('https://c798zyr7fl20.share.zrok.io/api/register/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }
      setSuccess(true);
      setTimeout(() => {
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }, 1000);
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
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
          <h2>Create an account</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form className="register-form" onSubmit={handleSubmit} autoComplete="on">
            <div className="register-input-wrapper">
              <label htmlFor="name" className="register-label">Name</label>
              <input
                className="register-input"
                type="text"
                name="name"
                id="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="register-input-wrapper">
              <label htmlFor="email" className="register-label">E-mail</label>
              <input
                className="register-input"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            <div className="register-input-wrapper">
              <label htmlFor="password" className="register-label">Password</label>
              <input
                className="register-input"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="register-input-wrapper">
              <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
              <input
                className="register-input"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="button-row">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Continue'}
              </button>
            </div>
          </form>
          <p className="register-link">
            Already have an account?
            <Link to="/login"> Log In</Link>
          </p>
          <p className="register-terms">
            By signing up, you understand and agree to our <Link to="/terms">Terms of Service</Link>, and <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;