import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Login.css';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('https://c798zyr7fl20.share.zrok.io/api/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.status || 'Verification failed');
      setMessage('✅ Email verified! Redirecting to login…');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className='hoho'>Verify Your Email</h2>
        <p style={{ color: 'var(--color-gray-200)', marginBottom: '1.5rem' }}>A code was sent to <strong>{email}</strong></p>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="login-input-wrapper">
            <label htmlFor="code" className="login-label">Verification Code</label>
            <input
              className='login-input'
              type="text"
              name="code"
              id="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              disabled={loading}
              autoFocus
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Verifying...' : 'Verify Email'}
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

export default VerifyEmail; 