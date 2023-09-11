import express from 'express';
import { paymentController } from './index';
const route = express.Router();

route.post('/pay', paymentController.pay);
route.get('/confirm/success', paymentController.success);
route.get('/confirm/cancel', paymentController.cancel);
route.get('/list', paymentController.list)

export default route;