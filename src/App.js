import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import ScrollToTop from "./ScrollToTop";
import InternetChecker from "./Component/Internet Checker/Internet Checker.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Component/Pages/Dashboard/Dashboard';
import User from './Component/Pages/User/User';
import Bill from './Component/Pages/Bill/Bill';
import Vendor from './Component/Pages/Vender/Vender';
import Profile from './Component/Pages/Profile/Profile';
import Login from './Component/Login_verification/login/Login';
import Verification from './Component/verification/Verification';
import ForgotPasswordFlow from './Component/Login_verification/login/ForgotPassword/ForgotPassword';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    const encryptedToken = localStorage.getItem("encryptedTokenForAdminOfHanaiHealth");
    
    if (isLoggedIn === "true" && encryptedToken) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Handle offline and online status
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("encryptedTokenForAdminOfHanaiHealth");
  };

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        {isOffline && <InternetChecker />}
        <Routes>
          {/* Redirect logged-in users from login-related routes */}
          {loggedIn && (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/verification" element={<Navigate to="/dashboard" />} />
              <Route path="/forgot-password" element={<Navigate to="/dashboard" />} />
            </>
          )}

          {/* Protected routes */}
          <Route path="/profile" element={loggedIn ? <Profile onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={loggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/vendor" element={loggedIn ? <Vendor onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/user" element={loggedIn ? <User onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/bill" element={loggedIn ? <Bill onLogout={handleLogout} /> : <Navigate to="/" />} />

          {/* Public routes */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/verification" element={<Verification onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordFlow onLogin={handleLogin} />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
