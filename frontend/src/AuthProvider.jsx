"use client";

import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, useContext, createContext } from 'react';
import { login } from './api/API';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(() => JSON.parse(localStorage.getItem('loggedIn')) || false);
    const [tokenExp, setTokenExp] = useState(false);

    useEffect(() => {
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));

        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            const decodedToken = jwtDecode(token.split('=')[1]);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                alert('Session expired. Please log in again.');
                setTokenExp(true);
                logout();
            }
        }
    }, [loggedIn]);

    const auth = async (data) => {
        await login(data);
        setLoggedIn(true);
    };

    const logout = () => {
        document.cookie = 'token=; Max-Age=0; path=/;';
        
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInUser');
        
        setLoggedIn(false);
        
        window.location.href = '/login';
    };

    const authValue = useMemo(() => ({ loggedIn, tokenExp, auth, logout }), [loggedIn]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};