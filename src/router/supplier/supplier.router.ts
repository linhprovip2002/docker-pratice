import express from 'express';
import { checkAuthor,verify } from '../../middleware';
import { validatorSupplier } from '../../middleware/validator.middleware';
import { supplierController } from './index';

const router = express.Router();

router.post('/',verify, checkAuthor('create supplier'), validatorSupplier, supplierController.createSupplier);
router.put('/:id',verify, checkAuthor('update supplier'), supplierController.updateSupplier); 
router.get('/', supplierController.getAllSuppliers);
router.get('/:id', supplierController.getDetail);



export default router;