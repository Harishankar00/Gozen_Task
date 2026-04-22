import type { RequestHandler } from 'express';
import { Role } from '../types/role.js';

export function authorize(allowedRoles: Role[]): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Forbidden',
        message: `Role "${req.user.role}" is not permitted to access this resource`,
      });
      return;
    }

    next();
  };
}
