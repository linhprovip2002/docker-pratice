import express from 'express';
import { categoryController } from './index';

const router = express.Router();

router.get('/:slug', categoryController.getProductsByCategoryName); 
export default router;