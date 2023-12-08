import express from 'express';
import { paymentRouter }  from './payment';
import { authRouter } from './authentication';
import { userRouter } from './user';
import { productRouter } from './product';
import { verify } from '../middleware/authentication.middleware';
import { categoryRouter } from './category';
import { supplierRouter } from './supplier';
import { discountRouter } from './discount';
import { stockRouter } from './stock';
import { roleRouter } from './role';
import { orderRouter } from './oder';

const router = express.Router();

router.use('/payment', paymentRouter);
router.use('/auth', authRouter);
router.use('/user',verify, userRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/supplier', supplierRouter);
router.use('/discount',verify, discountRouter);
router.use('/stocks', stockRouter);
router.use('/role',verify, roleRouter);
router.use('/order',verify, orderRouter)

export default router;