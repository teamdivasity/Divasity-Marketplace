import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';
import User from './User';
import Project from './Project';

class Investment extends Model {
  public id!: string;
  public userId!: string;
  public projectId!: string;
  public amount!: string; // DECIMAL stored as string
  public returnAmount?: string; // DECIMAL stored as string
  public successRate?: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Investment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    returnAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: '0.00',
    },
    successRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
  },
  {
    sequelize: database,
    modelName: 'Investment',
    tableName: 'Investments',
    timestamps: true,
  }
);



export default Investment;