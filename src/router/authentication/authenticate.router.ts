import express from 'express';
import { authenticateController } from './index';
const router = express.Router();

router.post('/register', authenticateController.register);
router.post('/login', authenticateController.login);

export default router;