import express from 'express';
import { categoryController } from './index';

const router = express.Router();

router.get('/', categoryController.getCategorys);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 5debd489d95fa8c73cdf3d90b98bd416031591c5
