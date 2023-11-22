import express from 'express';
import { categoryController } from './index';

const router = express.Router();

// router.get('/:slug', categoryController.getProductsByCategoryName);
router.get('/:id', categoryController.getCategoryById);
router.get('/', categoryController.getCategorys); 
export default router;