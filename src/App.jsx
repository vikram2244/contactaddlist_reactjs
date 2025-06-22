import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddContacts from './components/AddContact/AddContacts';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import './index.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Initialize from localStorage
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [emailLogin, setEmailLogin] = useState(() => {
        // Initialize from localStorage
        return localStorage.getItem('emailLogin') || '';
    });

    // Sync state changes to localStorage
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('emailLogin', emailLogin);
    }, [isLoggedIn, emailLogin]);

    const handleLoginSuccess = (email) => {
        setIsLoggedIn(true);
        setEmailLogin(email);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmailLogin('');
        // Clear localStorage on logout
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('emailLogin');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Routes>
                {/* Redirect root to login or contacts based on auth status */}
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/contacts" />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Registration route - only accessible if not logged in */}
                <Route
                    path="/register"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/contacts" />
                        ) : (
                            <Registration />
                        )
                    }
                />

                {/* Login route - only accessible if not logged in */}
                <Route
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/contacts" />
                        ) : (
                            <Login
                                onLoginSuccess={handleLoginSuccess}
                                setEmailLogin={setEmailLogin}
                            />
                        )
                    }
                />

                {/* Contacts route - protected, requires login */}
                <Route
                    path="/contacts"
                    element={
                        isLoggedIn ? (
                            <AddContacts
                                emailLogin={emailLogin}
                                onLogout={handleLogout}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;