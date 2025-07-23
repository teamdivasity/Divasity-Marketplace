"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiryTime = void 0;
const expiryTime = (minutesToExpiry) => {
    const now = new Date();
    return new Date(now.getTime() + minutesToExpiry * 60000);
};
exports.expiryTime = expiryTime;
