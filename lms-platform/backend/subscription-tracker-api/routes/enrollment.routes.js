import { Router } from 'express';
import { enrollUser, getUserEnrollments } from '../controllers/enrollment.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const enrollmentRouter = Router();

enrollmentRouter.post('/', authorize, enrollUser);
enrollmentRouter.get('/', authorize, getUserEnrollments);

export default enrollmentRouter;
