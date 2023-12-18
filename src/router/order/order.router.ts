import express from 'express';
import { checkAuthor, verify } from '../../middleware';
import oderController from './order.controller';

const router = express.Router();

// router supplier
router.get('/list', verify, checkAuthor(['Supplier','Authorization']), oderController.getOderByIdSupplier);
router.patch('/:id/action', verify, checkAuthor(['update supplier']) , oderController.updateOrder);

router.post('/', verify,checkAuthor(['create order']), oderController.createOder);
router.get('/', verify,checkAuthor(['read order']), oderController.getOderByUserId);
router.post('/:id/payment', verify, oderController.payment);
router.delete('/:id', verify,checkAuthor(['update order']), oderController.deleteOder);
router.patch('/:id', verify,checkAuthor(['delete order']), oderController.updateOrder);


export default router;