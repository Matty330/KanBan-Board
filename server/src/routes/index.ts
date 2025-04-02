// Path: Kandban Board/server/src/routes/index.ts

import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// Add authentication middleware to API routes
router.use('/api', authenticateToken, apiRoutes);

export default router;