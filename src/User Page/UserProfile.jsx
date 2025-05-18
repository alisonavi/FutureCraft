import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const token = localStorage.getItem('auth_token');

  // Redirect immediately if no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://10.176.3.43:8000/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
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
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div className="loader">Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;