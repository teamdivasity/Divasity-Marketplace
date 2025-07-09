import { Model, DataTypes } from 'sequelize';
import { database } from '../config/database';

export enum role {
    ADMIN = "admin",
    USER = "user",
}

export interface UserAttributes {
    id: string;
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    address?: string;
    role?: string;
    telephone?: string;
    profilePicture?: string | null;
    IsVerified?: boolean | null;
    // email_verified_at?: Date | null;
}

export class User extends Model<UserAttributes> {
    [x: string]: any;
}

User.init(
{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    }, 
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM(...Object.values(role)),
        allowNull: false,
        defaultValue: "user",
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    IsVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
    },
    // email_verified_at: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue: null,
    // }, 
},
{
    sequelize: database,
    tableName: "User",
    timestamps: true,
}
);

export default User;
