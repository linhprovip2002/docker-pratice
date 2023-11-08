import express from 'express';
import { checkAuthor } from '../../middleware';
import { validatorSupplier } from '../../middleware/validator.middleware';
import { supplierController } from './index';

const router = express.Router();

router.post('/', checkAuthor('create supplier'), validatorSupplier, supplierController.createSupplier);
router.put('/:id', checkAuthor('update supplier'), supplierController.updateSupplier); 
router.get('/', checkAuthor('read supplier'), supplierController.getAllSuppliers);
router.get('/:id', checkAuthor('read supplier'), supplierController.getDetail);



export default router;