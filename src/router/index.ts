import express from 'express';
import { paymentRouter }  from './payment';
import { authRouter } from './authentication';
import { userRouter } from './user';
import { productRouter } from './product';
import { verify } from '../middleware/authentication.middleware';

const router = express.Router();

router.use('/payment', paymentRouter);
router.use('/auth', authRouter);
router.use('/user',verify, userRouter);
router.use('/product',verify, productRouter);
export default router;