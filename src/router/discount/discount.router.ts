import express from 'express';
import { checkAuthor } from '../../middleware';
import { discountController } from './index';

const router = express.Router();

router.post('/addDiscount/:idProduct', checkAuthor('update product'), discountController.createDiscount);
router.put('/:id', checkAuthor('update product'), discountController.updateDiscount); 
router.delete('/:id', checkAuthor('update product'), discountController.deleteDiscount);


export default router;