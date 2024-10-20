import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(() => Boolean(localStorage.getItem('authToken')));
    const [userData, setUserData] = useState(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedUsername = localStorage.getItem('username');
        return storedEmail && storedUsername ? { email: storedEmail, username: storedUsername } : null;
    });

    const [timeRemaining, setTimeRemaining] = useState(0);


    const checkTokenValidity = (token) => {
        if (!token) return false;
        try {
            const { exp } = jwtDecode(token);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            return exp > currentTimestamp;
        } catch (error) {
            console.error('Token decoding failed:', error);
            return false;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('username');
        setAuthenticated(false);
        setUserData(null); // Clear user data on logout
        setTimeRemaining(0);  //reset remaining time
    };

    const handleLogin = (token, email, username) => { // Add username,email,token as a parameter
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email);  // Store email
        localStorage.setItem('username', username);  // Store username
        setAuthenticated(true);
       

        setUserData({
            username: username,  // Use the passed username
            email: email,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && checkTokenValidity(token)) {
            const { exp } = jwtDecode(token);
            const remainingDuration = exp * 1000 - Date.now();

            setTimeRemaining(remainingDuration / 1000); // Set initial remaining time in seconds

            const countdownInterval = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        handleLogout(); // Auto-logout when time expires
                        clearInterval(countdownInterval);
                        return 0;
                    }
                    return prev - 1; // Decrease the time by 1 second
                });
            }, 1000);

            return () => clearInterval(countdownInterval);
        } else {
            handleLogout();
        }
    }, []);

    return (
        <UserAuthContext.Provider value={{ authenticated, userData,handleLogin, handleLogout,timeRemaining }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuth = () => useContext(UserAuthContext);
