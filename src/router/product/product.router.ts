import express from 'express';
import { checkAuthor,verify,validatorReview } from '../../middleware';
import { productController } from './index';

const router = express.Router();


//discount 
router.get('/:id/discount', productController.getDiscountByProductId);


//review
router.get('/:id/review', productController.getReviewByProductId);
router.post('/:id/review',verify , checkAuthor(['create review']), validatorReview, productController.createReview);
router.put('/:id/review',verify, checkAuthor(['update review']), validatorReview, productController.updateReview);

router.post('/',verify, checkAuthor(['create product']), productController.createProduct);
router.get('/', productController.getProducts); 
router.get('/:id', productController.getOneProduct);
router.put('/:id',verify, checkAuthor(['update product']), productController.updateProduct);
router.delete('/:id',verify, checkAuthor(['delete product']), productController.deleteProduct); 


export default router;  