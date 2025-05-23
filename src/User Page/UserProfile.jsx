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
        const response = await fetch('https://207.127.93.193/api/user', {
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
      <div className="profile-card">
        <div className="profile-avatar">
          {getInitials(user.name)}
        </div>
        <div className="profile-username">{user.name}</div>
        <div className="profile-email">{user.email}</div>
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-label">User ID</div>
            <div className="profile-stat-value">{user.id}</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-label">Registered</div>
            <div className="profile-stat-value">{formatDate(user.created_at)}</div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="profile-btn" disabled>Edit Profile</button>
          <button className="profile-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;