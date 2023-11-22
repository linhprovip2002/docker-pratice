import express from 'express';
import { userController } from './index';
import { checkAuthor } from '../../middleware';
const router = express.Router();

router.post('/:id/role',checkAuthor('Authorization') , userController.addRoleForUser);

router.get('/me', userController.getInforMe);

// router for user register seller service
// router.post('/register', userController.registerSellerService);
// router.post('/accept',checkAuthor('Authorization'), userController.acceptSellerService);
// router.get('/list-request',checkAuthor('Authorization'), userController.getSellerService);

// router.get('/role' ,checkAuthor('Authorization'), userController.getRoles);
router.get('/',checkAuthor('read user') , userController.getUsers);
router.get('/:id',checkAuthor('read user') , userController.getUserById);
router.put('/:id',checkAuthor('update user'), userController.updateUser);
router.delete('/:id',checkAuthor('delete user'), userController.deleteUser);


// authorization with super admin

// router.get('/role/permission',checkAuthor('Authorization') , userController.getPermissions);
// router.post('/role/:id',checkAuthor('Authorization') , userController.addPermissionForRole);

// add permission for role


export default router;