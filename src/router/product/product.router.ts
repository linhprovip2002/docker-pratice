import express from 'express';
import { checkAuthor } from '../../middleware';
import { productController } from './index';

const router = express.Router();

router.post('/:id', checkAuthor('update product'), productController.updateProduct);
router.get('/', productController.getProducts); 
router.get('/:id', productController.getOneProduct);
router.delete('/:id', checkAuthor('delete product'), productController.deleteProduct); 

export default router;