import express from 'express';
import { userController } from './index';
import { checkAuthor } from '../../middleware';
const router = express.Router();

router.get('/',checkAuthor('read user') , userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


// router for user register seller service
router.post('/register', userController.registerSellerService);
router.post('/accept',checkAuthor('Authoriztion'), userController.acceptSellerService);
router.get('/list-request',checkAuthor('Authoriztion'), userController.getSellerService);
// authorization with super admin
router.post(':id/role',checkAuthor('Authoriztion') , userController.addRoleForUser);
router.get('/role',checkAuthor('Authoriztion') , userController.getRoles);
router.get('/role/permission',checkAuthor('Authoriztion') , userController.getPermissions);
router.post('/role/:id',checkAuthor('Authoriztion') , userController.addPermissionForRole);

// add permission for role


export default router;