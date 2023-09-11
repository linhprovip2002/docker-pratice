import express from 'express';
import { paymentRouter }  from './payment';

const router = express.Router();
router.use('/payment', paymentRouter);

export default router;