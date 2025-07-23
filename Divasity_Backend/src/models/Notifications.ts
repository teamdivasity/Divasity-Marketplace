import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database'; // Use your imported Sequelize instance

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


export default Notification;