import express from 'express';
import { checkAuthor,verify } from '../../middleware';
import { validatorProduct, validatorStock } from '../../middleware/validator.middleware';
import { stockController } from './index';

const router = express.Router();

// stock
router.post('/',verify, checkAuthor('update supplier'), validatorStock, stockController.createStock);
router.put('/:id',verify, checkAuthor('update supplier'), validatorStock, stockController.updateStock);
router.get('/', checkAuthor('read supplier'), stockController.getMyStocks);
router.get('/:id', checkAuthor('read supplier'), stockController.getProductsByStockId); 
router.delete('/:id',verify, checkAuthor('update supplier'), stockController.deleteStock);

router.post('/createproduct/:id', checkAuthor('update supplier'), validatorProduct, stockController.createProductinStock);


export default router;