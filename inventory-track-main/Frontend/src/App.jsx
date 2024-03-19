import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RoomManager from './components/RoomManager'; // Adjusted import
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Use state to manage the authentication status dynamically
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Function to update authentication status - you'll use this in your login and logout logic
  const updateAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/rooms" /> : <LoginForm updateAuthStatus={updateAuthStatus} />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/rooms" /> : <Navigate to="/login" />} exact />
        <Route path="/rooms" element={isAuthenticated ? <RoomManager updateAuthStatus={updateAuthStatus} /> : <Navigate to="/login" />} />
        {/* Add more protected routes here */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/rooms" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
