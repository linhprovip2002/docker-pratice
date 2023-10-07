import express from 'express';
import { userController } from './index';
import { checkAuthor } from '../../middleware';
const router = express.Router();

router.get('/',checkAuthor('READ USER') , userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
export default router;