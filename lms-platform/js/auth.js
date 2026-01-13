/**
 * Authentication Logic
 * Handles Login, Register, and Logout using backend API.
*/

import api from './api.js';


const Auth = {
    register: async (name, email, password, role = 'student') => {
        try {
            const response = await api.signUp({ name, email, password, role });
            return { success: true, message: 'Registration successful! Please login.' };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: error.message || 'An error occurred during registration.' };
        }
    },

    login: async (email, password) => {
        try {
            const response = await api.signIn({ email, password });

            // Store minimal user info in localStorage for sync UI checks
            // Sensitive info (token) is in HttpOnly cookie
            const sessionUser = response.data.user;
            localStorage.setItem('user', JSON.stringify(sessionUser));

            return { success: true, user: sessionUser, message: 'Login successful!' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message || 'Invalid email or password' };
        }
    },

    logout: async () => {
        try {
            await api.signOut();
            localStorage.removeItem('user');

            // Show feedback if utils available
            if (typeof UIUtils !== 'undefined') {
                UIUtils.showToast('Logged out successfully', 'info');
            }

            // Redirect
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.getCurrentUser();
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            localStorage.removeItem('user');
            return null;
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    }
};

export default Auth;
