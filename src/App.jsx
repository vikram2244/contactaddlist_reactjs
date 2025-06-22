import React, { useState } from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddContacts from './components/AddContact/AddContacts';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [emailLogin, setEmailLogin] = useState('');

    return (
        <>
        <Routes>
            <Route path="/register" element={<Registration />} />
            <Route
                path="/login"
                element={
                    <Login
                        onLoginSuccess={() => setIsLoggedIn(true)}
                        setEmailLogin={setEmailLogin}
                    />
                }
            />

            <Route
                path="/contact/:emailLogin"
                element={isLoggedIn ? <AddContacts emailLogin={emailLogin} /> : <Navigate to="/login" />}
            />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </>
    );
}

export default App;
