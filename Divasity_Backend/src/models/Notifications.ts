import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database'; // Use your imported Sequelize instance
import User from './User';
import News from './News';

class Notification extends Model {
  public id!: string;
  public UserId!: string;
  public NewsId!: string;
  public message!: string;
  public isRead!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    NewsId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: News,
        key: 'Newsid',
      },
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: database, // Use the imported 'database' instead of 'sequelize'
    modelName: 'Notification',
    tableName: 'Notifications',
    timestamps: true,
  }
);

// Define relationships
Notification.belongsTo(User, { foreignKey: 'UserId' });
Notification.belongsTo(News, { foreignKey: 'NewsId' });
User.hasMany(Notification, { foreignKey: 'UserId' });
News.hasMany(Notification, { foreignKey: 'NewsId' });

export default Notification;