import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Login.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const email = params.get('email');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      setMessage('Invalid reset link.');
    }
  }, [token, email]);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    if (password !== confirm) {
      setMessage('❌ Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://207.127.93.193/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password, password_confirmation: confirm })
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data.email || data.status) || 'Reset failed');
      setMessage('✅ Password reset! Redirecting to login…');
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
        <h2 className='hoho'>Reset Password</h2>
        <p style={{ color: 'var(--color-gray-200)', marginBottom: '1.5rem' }}>for <strong>{email}</strong></p>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="login-input-wrapper">
            <label htmlFor="password" className="login-label">New Password</label>
            <input
              className='login-input'
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="login-input-wrapper">
            <label htmlFor="confirm" className="login-label">Confirm Password</label>
            <input
              className='login-input'
              type="password"
              name="confirm"
              id="confirm"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword; 