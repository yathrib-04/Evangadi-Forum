import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Appstate } from '../App';
import axios from '../axiosConfig';

function ProtectedRoute({ children }) {
  const { setUser } = useContext(Appstate);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    const token = localStorage.getItem('token');
    
    // If no token exists, immediately set as not authenticated
    if (!token) {
      console.log('No token found, redirecting to login');
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    console.log('Token found, verifying with backend...');

    try {
      const { data } = await axios.get('/users/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // If authentication successful, set user and allow access
      if (data && data.username && data.userid) {
        console.log('Authentication successful');
        setUser({ username: data.username, userid: data.userid });
        setIsAuthenticated(true);
      } else {
        // Invalid response format
        console.log('Invalid response format, clearing token');
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Any error means authentication failed
      console.error('Authentication check failed:', error.response?.status || error.message);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-gray-800">Loading...</h2>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
}

export default ProtectedRoute;

