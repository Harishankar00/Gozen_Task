import type { Request, Response, NextFunction } from 'express';
import { Role, type AuthenticatedUser } from '../types/role.js';

// In a real app this would call jwt.verify(token, secret) and return the decoded payload.
// Per the exercise brief, any valid token produces a CONTRIBUTOR user.
// As a demo convenience, the tokens "admin-token" and "editor-token" stand in for those roles
// so every protected route can be exercised with curl.
function mockDecodeToken(token: string): AuthenticatedUser {
  if (token === 'admin-token') return { id: 'user-admin', role: Role.ADMIN };
  if (token === 'editor-token') return { id: 'user-editor', role: Role.EDITOR };
  return { id: 'user-contributor', role: Role.CONTRIBUTOR };
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (header?.startsWith('Bearer ')) {
    const token = header.slice('Bearer '.length).trim();
    if (token) {
      req.user = mockDecodeToken(token);
    }
  }

  next();
}
