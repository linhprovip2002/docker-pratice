import express from 'express';
import { productController } from './index';

const router = express.Router();

router.get('/', productController.getProducts); //check
router.get('/:id', productController.getOneProduct); //check
router.get('/discount', productController.getDiscounts); // nope
router.get('/search-by-category/:CategoryID', productController.getProductsbyCategory); //check
router.put('/:id', productController.updateProduct); //check
router.delete('/:id', productController.deleteProduct); //check
router.post('/add-category/:id', productController.addCategoryForProduct); //check

export default router;