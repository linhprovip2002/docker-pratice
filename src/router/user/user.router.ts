import express from 'express';
import { userController } from './index';
import { checkAuthor } from '../../middleware';
const router = express.Router();

router.get('/',checkAuthor('READ USER') , userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


// authorization with super admin
router.get('/role',checkAuthor('Authoriztion') , userController.getRoles);
router.get('/role/permission',checkAuthor('Authoriztion') , userController.getPermissions);
router.post('/role/:id',checkAuthor('Authoriztion') , userController.addPermissionForRole);

export default router;