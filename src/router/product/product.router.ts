import express from 'express';
import { checkAuthor,verify } from '../../middleware';
import { productController } from './index';

const router = express.Router();


//discount 
router.get('/:id/discount', productController.getDiscountByProductId);

router.patch('/comments/:commentId/reply', verify,productController.createReply);
router.patch('/comments/:commentId', verify,productController.updateComment);
router.delete('/comments/:commentId', verify,productController.deleteComment);

//review
router.get('/:id/comment', productController.getCommentsByProductId);
router.patch('/:id/rating',verify, productController.createRating);
router.post('/:id/comment',verify, productController.createComment);

router.post('/',verify, productController.createProduct);
router.get('/', productController.getProducts); 
router.get('/:id', productController.getOneProduct);
router.put('/:id',verify, checkAuthor(['update product']), productController.updateProduct);
router.delete('/:id',verify, checkAuthor(['delete product']), productController.deleteProduct); 


export default router;  