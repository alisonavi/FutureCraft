import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('https://207.127.93.193/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.email || data.status);
      setMessage('✅ ' + data.status);
    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className='hoho'>Forgot Password</h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="login-input-wrapper">
            <label htmlFor="email" className="login-label">E-mail</label>
            <input
              className='login-input'
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
        {message && message.startsWith('✅') ? (
          <div className="forgot-success-message">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <span className="checkmark">✔️</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Check your email!</div>
              <div style={{ fontSize: '1.05rem', color: 'var(--color-white)', marginBottom: '1.2rem', opacity: 0.92 }}>
                We've sent a password reset link to your email address. Please follow the instructions in the email to reset your password.<br />
                Didn't get the email? Check your spam folder or try again.
              </div>
              <Link to="/login">
                <button style={{
                  background: 'var(--gradient-accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.8rem',
                  padding: '0.8rem 2.2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(59,176,212,0.10)',
                  marginTop: '0.5rem',
                  transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
                }}>Go to Login</button>
              </Link>
            </div>
          </div>
        ) : message && (
          <div className="status-message error forgot-success-message">
            <span style={{ fontSize: '1.15rem', fontWeight: 600 }}>{message.replace('❌ ', '')}</span>
          </div>
        )}
        <p className="register-link">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword; 