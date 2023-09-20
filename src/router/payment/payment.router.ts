import express from 'express';
import { paymentController } from './index';
const router = express.Router();

router.post('/pay', paymentController.pay);
router.get('/confirm/success', paymentController.success);
router.get('/confirm/cancel', paymentController.cancel);
router.get('/list', paymentController.list)

export default router;