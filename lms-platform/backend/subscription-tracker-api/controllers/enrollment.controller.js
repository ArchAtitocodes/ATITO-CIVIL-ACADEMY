import Enrollment from '../models/enrollment.model.js';

export const enrollUser = async (req, res, next) => {
    try {
        const { courseId } = req.body;
        const userId = req.user._id;

        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId
        });

        res.status(201).json({ success: true, data: enrollment });
    } catch (error) {
        next(error);
    }
};

export const getUserEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
        res.status(200).json({ success: true, data: enrollments });
    } catch (error) {
        next(error);
    }
};
