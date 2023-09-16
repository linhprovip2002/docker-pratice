import express from 'express';
import { paymentRouter }  from './payment';
import  testRouter  from './test';
const router = express.Router();
router.use('/test', testRouter);
router.use('/payment', paymentRouter);

export default router;