import express from 'express';
import { checkAuthor,verify } from '../../middleware';
import { validatorSupplier } from '../../middleware/validator.middleware';
import { supplierController } from './index';

const router = express.Router();


// router register supplier
router.post('/register',verify,checkAuthor(['read user']), supplierController.registerSupplier);
router.post('/accept',verify,checkAuthor(['Authorization']), supplierController.acceptSupplier);
router.get('/list-request',verify,checkAuthor(['Authorization']), supplierController.getSellerService);
router.get('/me',verify,checkAuthor(['read supplier']), supplierController.getSupplierByUserId);

// manage product of supplier

router.get('/products',verify,checkAuthor(['read supplier']) ,supplierController.getProducts);


router.post('/',verify, checkAuthor(['create supplier']), validatorSupplier, supplierController.createSupplier);
router.put('/:id',verify, checkAuthor(['update supplier']), supplierController.updateSupplier); 
router.get('/',checkAuthor(['Authorization']), supplierController.getAllSuppliers);
router.get('/:id',checkAuthor(['read supplier']), supplierController.getDetail);



export default router;