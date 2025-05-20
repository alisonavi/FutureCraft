import React, { useState } from 'react';
import './Contact.css';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Sending message...' });

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h1>Get in Touch</h1>
            <p>Have questions about your career path? We're here to help!</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <p>support@futurecraft.com</p>
                </div>
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <p>+1 (251) 324-7355</p>
                </div>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>Orange Beach, AL 36561</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {status.message && (
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              )}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact; 