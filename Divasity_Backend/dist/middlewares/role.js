"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
// Middleware to check if user has one of the allowed roles
const checkRole = (roles) => {
    return (req, res, next) => {
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
exports.checkRole = checkRole;
