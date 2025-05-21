import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './UserProfile.css';

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

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://vqx6h54dnc1n.share.zrok.io/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitials(user.name)}
          </div>
          <h2>Welcome, {user.name}</h2>
        </div>
        <div className="profile-info">
          <div className="info-group">
            <span className="info-icon" role="img" aria-label="User ID">🆔</span>
            <div className="info-label">User ID</div>
            <div className="info-value">{user.id}</div>
          </div>
          <div className="info-group">
            <span className="info-icon" role="img" aria-label="Name">👤</span>
            <div className="info-label">Name</div>
            <div className="info-value">{user.name}</div>
          </div>
          <div className="info-group">
            <span className="info-icon" role="img" aria-label="Email">📧</span>
            <div className="info-label">Email</div>
            <div className="info-value">{user.email}</div>
          </div>
          <div className="info-group">
            <span className="info-icon" role="img" aria-label="Registration Date">📅</span>
            <div className="info-label">Registered</div>
            <div className="info-value">{formatDate(user.created_at)}</div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="edit-profile-btn" disabled>Edit Profile</button>
          <button className="edit-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;