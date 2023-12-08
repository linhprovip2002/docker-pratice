import express from 'express';
import { verify } from '../../middleware';
import oderController from './order.controller';

const router = express.Router();

// router supplier
router.get('/list', verify, oderController.getOderByIdSupplier);

router.post('/', verify, oderController.createOder);
router.get('/', verify, oderController.getOderByUserId);
router.post('/:id/payment', verify, oderController.payment);
router.delete('/:id', verify, oderController.deleteOder);
router.patch('/:id', verify, oderController.updateOder);

export default router;