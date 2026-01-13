/**
 * Course Data Service
 * Fetches course catalog from the backend API.
 */

import api from './api.js';

const CourseData = {
    /**
     * Fetches all courses from the API.
     */
    async getAllCourses() {
        try {
            const response = await api.getCourses();
            return response.data || [];
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    },

    /**
     * Fetches a single course by ID.
     */
    async getCourseById(id) {
        try {
            const response = await api.getCourseById(id);
            return response.data;
        } catch (error) {
            console.error(`Error fetching course ${id}:`, error);
            return null;
        }
    }
};

/**
 * CourseService - Legacy Compatibility Layer
 * All methods are now ASYNC.
 */
export const CourseService = {
    getAll: async () => await CourseData.getAllCourses(),
    getById: async (id) => await CourseData.getCourseById(id),
    getByCategory: async (category) => {
        const courses = await CourseData.getAllCourses();
        return category === 'all' ? courses : courses.filter(c => c.category === category);
    }
};

export default CourseData;
