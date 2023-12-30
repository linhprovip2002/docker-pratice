import express from 'express';
import { checkAuthor } from '../../middleware';
import { statisticalController } from './index';

const router = express.Router();

router.patch('/',checkAuthor(['Authorization']), statisticalController.getStatisticalAdmin);
// router.get('/',checkAuthor(['Authorization']), statisticalController.getStatisticalAdmin);
router.patch('/:id',checkAuthor(['Authorization','Supplier']), statisticalController.getStatistical);


export default router;