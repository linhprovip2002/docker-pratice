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

const router = express.Router();

router.use('/payment', paymentRouter);
router.use('/auth', authRouter);
router.use('/user',verify, userRouter);
router.use('/products',verify, productRouter);
router.use('/category', categoryRouter);
router.use('/supplier', verify, supplierRouter);
router.use('/discount',verify, discountRouter);
router.use('/stocks',verify, stockRouter);
router.use('/role',verify, roleRouter);

export default router;