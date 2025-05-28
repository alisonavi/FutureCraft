import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './UserProfile.css';
import ReactMarkdown from 'react-markdown';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  let token = localStorage.getItem('access_token') || getCookie('access_token');
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [analysisError, setAnalysisError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Password reset states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://207.127.93.193/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
            'skip_zrok_interstitial': 'true',
          }
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(true);
      }
    };

    fetchUser();

    const fetchAnalysis = async () => {
      setAnalysisLoading(true);
      setAnalysisError('');
      try {
        const res = await fetch('https://207.127.93.193/api/preference-analysis', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Could not fetch analysis');
        const data = await res.json();
        setAnalysis(data.analysis);
      } catch (err) {
        setAnalysisError('Could not load your career analysis.');
      } finally {
        setAnalysisLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (error) {
    localStorage.removeItem('access_token');
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    return <Navigate to="/login" />;
  }

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    window.location.href = '/login';
  };

  const handleEdit = () => {
    setNewName(user.name);
    setEditing(true);
    setEditMessage('');
  };

  const handleEditCancel = () => {
    setEditing(false);
    setEditMessage('');
  };

  const handleEditSave = async () => {
    if (!newName.trim() || newName === user.name) {
      setEditing(false);
      return;
    }
    setEditLoading(true);
    setEditMessage('');
    try {
      const response = await fetch('https://207.127.93.193/api/user', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'skip_zrok_interstitial': 'true',
        },
        body: JSON.stringify({ name: newName })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }
      const data = await response.json();
      setUser((prev) => ({ ...prev, name: data.data.name }));
      setEditMessage('Profile updated successfully!');
      setEditing(false);

      // Clear the message after 2 seconds
      setTimeout(() => {
        setEditMessage('');
      }, 2000);
    } catch (err) {
      setEditMessage('Error: ' + (err.message || 'Failed to update profile'));
      // Clear error message after 2 seconds
      setTimeout(() => {
        setEditMessage('');
      }, 2000);
    } finally {
      setEditLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    setIsResettingPassword(true);
    try {
      const response = await fetch('https://207.127.93.193/api/user/password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'skip_zrok_interstitial': 'true',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update password');
      }

      setPasswordSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password');
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="profile-container">
      <motion.div
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <motion.div
            className="profile-avatar"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getInitials(user.name)}
          </motion.div>
          <div className="profile-header-info">
            <div className="profile-name-section">
              {editing ? (
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="profile-edit-input"
                  disabled={editLoading}
                  maxLength={40}
                  placeholder="Enter your name"
                  autoFocus
                />
              ) : (
                <h1 className="profile-name">{user.name}</h1>
              )}
              <div className="profile-email">{user.email}</div>
            </div>
            <div className="profile-actions">
              {editing ? (
                <>
                  <motion.button
                    className="profile-btn primary"
                    onClick={handleEditSave}
                    disabled={editLoading || !newName.trim() || newName === user.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editLoading ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                  <motion.button
                    className="profile-btn secondary"
                    onClick={handleEditCancel}
                    disabled={editLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    className="profile-btn primary"
                    onClick={handleEdit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    className="profile-btn secondary"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`profile-tab ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            Career Analysis
          </button>
          <button
            className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        <div className="profile-tab-content">
          {activeTab === 'overview' ? (
            <motion.div
              className="profile-overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="profile-stats-grid">
                <div className="profile-stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <h3>Member Since</h3>
                    <p>{formatDate(user.created_at)}</p>
                  </div>
                </div>
                <div className="profile-stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <h3>Career Paths</h3>
                    <p>3 Saved</p>
                  </div>
                </div>
                <div className="profile-stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h3>Tests Completed</h3>
                    <p>2 Tests</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'analysis' ? (
            <motion.div
              className="profile-analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="analysis-card">
                <h2>Your Career Path Analysis</h2>
                {analysisLoading ? (
                  <div className="analysis-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your analysis...</p>
                  </div>
                ) : analysisError ? (
                  <div className="analysis-error">
                    <p>{analysisError}</p>
                  </div>
                ) : analysis ? (
                  <div className="analysis-content">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="analysis-empty">
                    <p>No analysis available yet. Complete your preference test to get started!</p>
                    <motion.button
                      className="profile-btn primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = '/preftest'}
                    >
                      Take Test
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="profile-security"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="security-card">
                <h2>Change Password</h2>
                <form onSubmit={handlePasswordReset} className="password-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="password-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="password-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="password-input"
                      required
                    />
                  </div>
                  {passwordError && (
                    <div className="password-error">{passwordError}</div>
                  )}
                  {passwordSuccess && (
                    <div className="password-success">{passwordSuccess}</div>
                  )}
                  <motion.button
                    type="submit"
                    className="profile-btn"
                    disabled={isResettingPassword}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isResettingPassword ? 'Updating...' : 'Update Password'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {editMessage && (
        <motion.div
          className="profile-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {editMessage}
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;