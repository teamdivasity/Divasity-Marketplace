import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';


class Project extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public category!: string;
  public totalMoneyInvested!: string; // DECIMAL stored as string
  public expectedRaiseAmount!: string; // DECIMAL stored as string
  public description?: string;
  public status!: string;
  public startDate?: Date;
  public endDate?: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Project.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalMoneyInvested: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: '0.00',
    },
    expectedRaiseAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('OPEN', 'FUNDED', 'CLOSED'),
      allowNull: false,
      defaultValue: 'OPEN',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    modelName: 'Project',
    tableName: 'Projects',
    timestamps: true,
  }
);



export default Project;