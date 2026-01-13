/**
 * API Service - Centralized communication with the backend
 */

const API_BASE_URL = 'http://localhost:5500/api/v1';

const api = {
    /**
     * Generic fetch wrapper with error handling
     */
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        // Ensure we send cookies (credentials) for auth
        options.credentials = 'include';

        if (options.body && typeof options.body === 'object') {
            options.body = JSON.stringify(options.body);
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json'
            };
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    },

    // Auth Endpoints
    async signUp(userData) {
        return this.request('/auth/sign-up', {
            method: 'POST',
            body: userData
        });
    },

    async signIn(credentials) {
        return this.request('/auth/sign-in', {
            method: 'POST',
            body: credentials
        });
    },

    async signOut() {
        return this.request('/auth/sign-out', {
            method: 'POST'
        });
    },

    async getCurrentUser() {
        return this.request('/users/me');
    },

    // Course Endpoints
    async getCourses() {
        return this.request('/courses');
    },

    async getCourseById(id) {
        return this.request(`/courses/${id}`);
    }
};

export default api;
