import express from 'express';
import { checkAuthor } from '../../middleware';
import { validatorReview } from '../../middleware/validator.middleware';
import { productController } from './index';

const router = express.Router();

router.put('/:id', checkAuthor('update product'), productController.updateProduct);
router.get('/', productController.getProducts); 
router.get('/:id', productController.getOneProduct);
router.delete('/:id', checkAuthor('delete product'), productController.deleteProduct); 

//review
router.get('/:id/review', productController.getReviewByProductId);
router.post('/:id/review', checkAuthor('create review'), validatorReview, productController.createReview);
router.put('/:id/review', checkAuthor('update review'), validatorReview, productController.updateReview);

//discount 
router.get('/:id/discount', productController.getDiscountByProductId);

export default router;