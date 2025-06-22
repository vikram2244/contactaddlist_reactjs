import React, { useEffect, useState } from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddContacts from './components/AddContact/AddContacts';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading state
    const [emailLogin, setEmailLogin] = useState('');

    useEffect(() => {
        const storedLogin = localStorage.getItem("isLoggedIn");
        const storedEmail = localStorage.getItem("emailLogin");

        if (storedLogin === "true" && storedEmail) {
            setIsLoggedIn(true);
            setEmailLogin(storedEmail);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>; // Prevents routing until state is restored
    }

    return (
        <Routes>
            <Route path="/register" element={<Registration />} />
            <Route
                path="/login"
                element={
                    <Login
                        onLoginSuccess={() => {
                            setIsLoggedIn(true);
                            const email = localStorage.getItem("emailLogin");
                            setEmailLogin(email);
                            localStorage.setItem("isLoggedIn", "true");
                        }}
                        setEmailLogin={(email) => {
                            setEmailLogin(email);
                            localStorage.setItem("emailLogin", email);
                        }}
                    />
                }
            />
            <Route
                path="/contact"
                element={
                    isLoggedIn ? (
                        <AddContacts emailLogin={emailLogin} />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
