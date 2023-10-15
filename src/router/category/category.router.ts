import express from 'express';
import { categoryController } from './index';

const router = express.Router();

router.get('/', categoryController.getCategorys);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


export default router;