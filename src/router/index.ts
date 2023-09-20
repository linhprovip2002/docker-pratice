import express from 'express';
import { paymentRouter }  from './payment';
import { authRouter } from './authentication';

const router = express.Router();

router.use('/payment', paymentRouter);
router.use('/auth', authRouter);

export default router;