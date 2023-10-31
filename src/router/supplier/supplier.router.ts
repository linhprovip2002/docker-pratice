import express from 'express';
import { checkAuthor } from '../../middleware';
import { validatorStock, validatorSupplier } from '../../middleware/validator.middleware';
import { supplierController } from './index';

const router = express.Router();

router.post('/', checkAuthor('create supplier'), validatorSupplier, supplierController.createSupplier);
router.put('/:id', checkAuthor('update supplier'), validatorSupplier, supplierController.updateSupplier); 
router.get('/', checkAuthor('read supplier'), supplierController.getAllSuppliers);
router.get('/:id', checkAuthor('read supplier'), supplierController.getDetail);

// stock
router.post('/stocks/', checkAuthor('update supplier'), validatorStock, supplierController.createStock);
router.post('/stocks/:id', checkAuthor('update supplier'), validatorStock, supplierController.updateStock);
router.get('/stocks/', checkAuthor('read supplier'), supplierController.getMyStocks);
router.get('/stocks/:id', checkAuthor('read supplier'), supplierController.getProductsByStockId); 
router.delete('/stocks/:id', checkAuthor('update supplier'), supplierController.deleteStock);

router.post('/stocks/:id/createproduct', checkAuthor('update supplier'), supplierController.createProductinStock);


export default router;