import express from 'express';
import { authenticateController } from './index';
const router = express.Router();

router.post('/register', authenticateController.register);

export default router;