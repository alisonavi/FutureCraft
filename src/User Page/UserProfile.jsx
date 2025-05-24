import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://c798zyr7fl20.share.zrok.io/api/user', {
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

    // Fetch preference analysis
    const fetchAnalysis = async () => {
      setAnalysisLoading(true);
      setAnalysisError('');
      try {
        const res = await fetch('https://c798zyr7fl20.share.zrok.io/api/preference-analysis', {
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
    return <div className="loader">Loading...</div>;
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
      const response = await fetch('https://c798zyr7fl20.share.zrok.io/api/user', {
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
    } catch (err) {
      setEditMessage('Error: ' + (err.message || 'Failed to update profile'));
    } finally {
      setEditLoading(false);
    }
  };

  // Helper to get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {getInitials(user.name)}
        </div>
        <div className="profile-username">
          {editing ? (
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="profile-edit-input pretty-input"
              disabled={editLoading}
              maxLength={40}
              placeholder="Enter your name"
              autoFocus
            />
          ) : user.name}
        </div>
        <div className="profile-email">{user.email}</div>
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-label">Registered</div>
            <div className="profile-stat-value">{formatDate(user.created_at)}</div>
          </div>
        </div>
        <div className="profile-actions">
          {editing ? (
            <>
              <button className="profile-btn" onClick={handleEditSave} disabled={editLoading || !newName.trim() || newName === user.name}>
                {editLoading ? 'Saving...' : 'Save'}
              </button>
              <button className="profile-btn" onClick={handleEditCancel} disabled={editLoading}>Cancel</button>
            </>
          ) : (
            <button className="profile-btn" onClick={handleEdit}>Edit Profile</button>
          )}
          <button className="profile-btn" onClick={handleLogout}>Logout</button>
        </div>
        {editMessage && <div className="profile-edit-message">{editMessage}</div>}
      </div>
      <div className="profile-analysis-card card fade-in fade-in-2" style={{ maxWidth: 700, margin: '2.5rem auto 0 auto', background: 'var(--gradient-secondary)', borderRadius: '1.5rem', padding: '2.2rem 2.5rem', color: 'var(--color-white)', boxShadow: '0 4px 24px rgba(0,21,56,0.15)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.2rem', background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Your Career Path Analysis</h2>
        {analysisLoading ? (
          <div style={{ color: 'var(--color-gray-200)', fontSize: '1.1rem' }}>Loading analysis...</div>
        ) : analysisError ? (
          <div style={{ color: 'salmon', fontSize: '1.1rem' }}>{analysisError}</div>
        ) : analysis ? (
          <div style={{ color: 'var(--color-gray-100)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        ) : (
          <div style={{ color: 'var(--color-gray-300)' }}>No analysis available yet.</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;