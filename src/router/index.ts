import express from 'express';
import { paymentRouter }  from './payment';
import { authRouter } from './authentication';
import { userRouter } from './user';
import { verify } from '../middleware/authentication.middleware';

const router = express.Router();

router.use('/payment', paymentRouter);
router.use('/auth', authRouter);
router.use('/user',verify, userRouter);
export default router;