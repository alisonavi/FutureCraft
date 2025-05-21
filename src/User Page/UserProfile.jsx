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
  let token = "1|knhfV3cifRisUiFYMpZEhzLnFftsKfFiw7teKukq0a3e73e4"
  if (!token) {
    token = getCookie('auth_token');
  }

  // Redirect immediately if no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://96d2jf3spu3j.share.zrok.io/api/user', {
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
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(true);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    localStorage.removeItem('auth_token');
    document.cookie = 'auth_token=; Max-Age=0; path=/;';
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div className="loader">Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    document.cookie = 'auth_token=; Max-Age=0; path=/;';
    window.location.href = '/login';
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h2>Welcome, {user.name}</h2>
        </div>
        <div className="profile-info">
          <div className="info-group">
            <div className="info-label">Name</div>
            <div className="info-value">{user.name}</div>
          </div>
          <div className="info-group">
            <div className="info-label">Email</div>
            <div className="info-value">{user.email}</div>
          </div>
        </div>
        <button className="edit-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;