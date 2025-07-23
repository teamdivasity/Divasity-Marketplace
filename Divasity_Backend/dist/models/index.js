"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.Investment = exports.Project = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Project_1 = __importDefault(require("./Project"));
exports.Project = Project_1.default;
const Investment_1 = __importDefault(require("./Investment"));
exports.Investment = Investment_1.default;
const Notifications_1 = __importDefault(require("./Notifications"));
exports.Notification = Notifications_1.default;
// Define associations
User_1.default.hasMany(Project_1.default, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Project_1.default.belongsTo(User_1.default, { foreignKey: 'userId' });
User_1.default.hasMany(Investment_1.default, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Project_1.default.hasMany(Investment_1.default, { foreignKey: 'projectId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Investment_1.default.belongsTo(User_1.default, { foreignKey: 'userId' });
Investment_1.default.belongsTo(Project_1.default, { foreignKey: 'projectId' });
User_1.default.hasMany(Notifications_1.default, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Notifications_1.default.belongsTo(User_1.default, { foreignKey: 'UserId' });
