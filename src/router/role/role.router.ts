import express from 'express';
import { checkAuthor } from '../../middleware';
import { roleController } from './index';

const router = express.Router();

// role
router.get('/',checkAuthor('Authorization'), roleController.getRoles);
router.get('/permission',checkAuthor('Authorization') , roleController.getPermissions);
router.post('/:id/add',checkAuthor('Authorization') , roleController.addPermissionForRole);
router.patch('/:id/remove',checkAuthor('Authorization') , roleController.removePermissionForRole);

export default router;