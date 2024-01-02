import express from 'express';
import { authenticateController } from './index';
import { validatorLogin,validatorRegister } from '../../middleware/';
const router = express.Router();

router.post('/register',validatorRegister, authenticateController.register);
router.post('/login', validatorLogin,  authenticateController.login);
router.post('/forgot-password', authenticateController.forgotPassword);
router.post('/reset-password/', authenticateController.resetPassword);

export default router;