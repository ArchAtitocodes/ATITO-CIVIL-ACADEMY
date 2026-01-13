import Course from '../models/course.model.js';

export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);
    }
};

export const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            const error = new Error('Course not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};

export const createCourse = async (req, res, next) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};
