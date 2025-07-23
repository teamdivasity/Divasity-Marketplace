import { Request, Response, NextFunction } from 'express';

// Extend Request interface to match the one in auth middleware and controllers
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Middleware to check if user has one of the allowed roles
export const checkRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // Check if user exists and has a role
    if (!req.user || !req.user.role) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return;
    }

    // Check if user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient role permissions' });
      return;
    }

    // Call next() to proceed to the next middleware or route handler
    next();
  };
};