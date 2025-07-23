import { Model, DataTypes } from 'sequelize';
import { database } from '../config/database';

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    INVESTOR = "investor"
}

export interface UserAttributes {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    address?: string;
    role: UserRole;
    telephone?: string;
    profilePicture?: string;
    bio?: string;
    skills?: string;
    interests?: string;
    walletAddress?: string;
    totalInvested?: number;
    totalRaised?: number;
    projectsCount?: number;
    followersCount?: number;
    followingCount?: number;
    isVerified: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    lastLoginAt?: Date;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User extends Model<UserAttributes> {
    [x: string]: any;
}

User.init(
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    }, 
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
            notEmpty: true
        }
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 30],
            isAlphanumeric: true
        }
    },
    role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.USER,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 255]
        }
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            is: /^[+]?[1-9]\d{1,14}$/
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    },
    skills: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const value = this.getDataValue('skills');
            return value ? JSON.parse(value) : [];
        },
        set(value: string[]) {
            this.setDataValue('skills', JSON.stringify(value));
        }
    },
    interests: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const value = this.getDataValue('interests');
            return value ? JSON.parse(value) : [];
        },
        set(value: string[]) {
            this.setDataValue('interests', JSON.stringify(value));
        }
    },
    walletAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    totalInvested: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
    },
    totalRaised: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
    },
    projectsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    followersCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    followingCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isPhoneVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emailVerificationExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    sequelize: database,
    tableName: "User",
    timestamps: true,
}
);

export default User;
