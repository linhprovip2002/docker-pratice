import express from 'express';
import { categoryController } from './index';

const router = express.Router();

router.get('/:slug', categoryController.getProductsByCategoryName);
router.get('/', categoryController.getCategorys); 
export default router;