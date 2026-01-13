import { Router } from 'express';
import { getAllCourses, getCourseById, createCourse } from '../controllers/course.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const courseRouter = Router();

courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.post('/', authorize, createCourse); // Protect creation

export default courseRouter;
