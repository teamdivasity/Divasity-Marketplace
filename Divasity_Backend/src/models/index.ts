
import User from './User';
import Project from './Project';
import Investment from './Investment';
import Notification from './Notifications';

// Define associations
User.hasMany(Project, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Investment, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Project.hasMany(Investment, { foreignKey: 'projectId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Investment.belongsTo(User, { foreignKey: 'userId' });
Investment.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(Notification, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'UserId' });

export { User, Project, Investment, Notification };
