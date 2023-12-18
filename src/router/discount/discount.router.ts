import express from 'express';
import { checkAuthor } from '../../middleware';
import { validatorDiscount } from '../../middleware/validator.middleware';
import { discountController } from './index';

const router = express.Router();

router.post('/addDiscount/:idProduct', checkAuthor(['update product']), validatorDiscount, discountController.createDiscount);
router.put('/:id', checkAuthor(['update product']), validatorDiscount, discountController.updateDiscount); 
router.delete('/:id', checkAuthor(['update product']), discountController.deleteDiscount);


export default router;