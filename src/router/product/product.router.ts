import express from 'express';
import { productController } from './index';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/category', productController.getCategorys);
router.get('/discount', productController.getDiscounts);
router.get('/:CategoryID', productController.getProductsbyCategory);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Add category for a product
router.post('/add-category', productController.addCategoryForProduct);

export default router;
