import express from 'express';
import { checkAuthor } from '../../middleware';
import { validatorProduct, validatorStock } from '../../middleware/validator.middleware';
import { stockController } from './index';

const router = express.Router();

// stock
router.post('/', checkAuthor('update supplier'), validatorStock, stockController.createStock);
router.put('/:id', checkAuthor('update supplier'), validatorStock, stockController.updateStock);
router.get('/', checkAuthor('read supplier'), stockController.getMyStocks);
router.get('/:id', checkAuthor('read supplier'), stockController.getProductsByStockId); 
router.delete('/:id', checkAuthor('update supplier'), stockController.deleteStock);

router.post('/createproduct/:id', checkAuthor('update supplier'), validatorProduct, stockController.createProductinStock);


export default router;