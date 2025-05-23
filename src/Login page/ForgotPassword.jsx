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
      const res = await fetch('https://207.127.93.193/api/reset-password', {
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
        {message && <p className="status-message" style={{ marginTop: '1.5rem' }}>{message}</p>}
        <p className="register-link">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword; 