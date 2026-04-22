import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { Role } from '../types/role.js';

const router = Router();

// GET /profile — any authenticated user (ADMIN, EDITOR, CONTRIBUTOR)
router.get(
  '/profile',
  authenticate,
  authorize([Role.ADMIN, Role.EDITOR, Role.CONTRIBUTOR]),
  (req, res) => {
    res.json({
      message: 'Profile fetched',
      user: req.user,
    });
  },
);

// POST /content — ADMIN and EDITOR only
router.post(
  '/content',
  authenticate,
  authorize([Role.ADMIN, Role.EDITOR]),
  (req, res) => {
    res.status(201).json({
      message: 'Content created',
      createdBy: req.user,
      payload: req.body,
    });
  },
);

// DELETE /system — ADMIN only
router.delete(
  '/system',
  authenticate,
  authorize([Role.ADMIN]),
  (req, res) => {
    res.json({
      message: 'System wiped',
      actor: req.user,
    });
  },
);

export default router;
