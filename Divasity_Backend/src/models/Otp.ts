import { Model, DataTypes, Optional } from 'sequelize';
import { database } from '../config/database';
import { User } from './User';

export enum OtpType {
    EMAIL_VERIFICATION = 'email_verification',
    PASSWORD_RESET = 'password_reset',
    LOGIN_VERIFICATION = 'login_verification',
    PHONE_VERIFICATION = 'phone_verification',
    TWO_FACTOR = 'two_factor',
    TRANSACTION_VERIFICATION = 'transaction_verification'
}

export interface OtpAttributes {
    id: string;
    userId?: string;
    email?: string;
    phone?: string;
    otp: string;
    type: OtpType;
    expiryTime: Date;
    isUsed: boolean;
    attempts: number;
    maxAttempts: number;
    ipAddress?: string;
    userAgent?: string;
    metadata?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OtpCreationAttributes extends Optional<OtpAttributes,
    'id' | 'isUsed' | 'attempts' | 'maxAttempts' | 'createdAt' | 'updatedAt'> {}

export class Otp extends Model<OtpAttributes, OtpCreationAttributes> {
    public id!: string;
    public userId?: string;
    public email?: string;
    public phone?: string;
    public otp!: string;
    public type!: OtpType;
    public expiryTime!: Date;
    public isUsed!: boolean;
    public attempts!: number;
    public maxAttempts!: number;
    public ipAddress?: string;
    public userAgent?: string;
    public metadata?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Association
    public user?: User;

    get isExpired(): boolean {
        return new Date() > this.expiryTime;
    }

    get isValid(): boolean {
        return !this.isUsed && !this.isExpired && this.attempts < this.maxAttempts;
    }

    get remainingAttempts(): number {
        return Math.max(0, this.maxAttempts - this.attempts);
    }

    get timeRemaining(): number {
        const now = new Date();
        const expiry = new Date(this.expiryTime);
        return Math.max(0, expiry.getTime() - now.getTime());
    }

    get timeRemainingMinutes(): number {
        return Math.floor(this.timeRemaining / (1000 * 60));
    }

    async incrementAttempts(): Promise<void> {
        this.attempts += 1;
        await this.save();
    }

    async markAsUsed(): Promise<void> {
        this.isUsed = true;
        await this.save();
    }

    static async generateOtp(length: number = 6): Promise<string> {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += digits[Math.floor(Math.random() * digits.length)];
        }
        return otp;
    }

    static async createOtp(data: {
        userId?: string;
        email?: string;
        phone?: string;
        type: OtpType;
        expiryMinutes?: number;
        ipAddress?: string;
        userAgent?: string;
        metadata?: any;
    }): Promise<Otp> {
        const otp = await this.generateOtp();
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + (data.expiryMinutes || 10));

        return await this.create({
            ...data,
            otp,
            expiryTime,
            metadata: data.metadata ? JSON.stringify(data.metadata) : undefined
        });
    }

    static async verifyOtp(data: {
        otp: string;
        email?: string;
        phone?: string;
        userId?: string;
        type: OtpType;
    }): Promise<{ success: boolean; message: string; otpRecord?: Otp }> {
        const whereClause: any = {
            otp: data.otp,
            type: data.type,
            isUsed: false
        };

        if (data.email) whereClause.email = data.email;
        if (data.phone) whereClause.phone = data.phone;
        if (data.userId) whereClause.userId = data.userId;

        const otpRecord = await this.findOne({ where: whereClause });

        if (!otpRecord) {
            return { success: false, message: 'Invalid OTP code' };
        }

        if (otpRecord.isExpired) {
            return { success: false, message: 'OTP code has expired' };
        }

        if (otpRecord.attempts >= otpRecord.maxAttempts) {
            return { success: false, message: 'Maximum attempts exceeded' };
        }

        await otpRecord.markAsUsed();
        return { success: true, message: 'OTP verified successfully', otpRecord };
    }
}

Otp.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[+]?[1-9]\d{1,14}$/
        }
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 8],
            isNumeric: true
        }
    },
    type: {
        type: DataTypes.ENUM(...Object.values(OtpType)),
        allowNull: false
    },
    expiryTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    maxAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
        validate: {
            min: 1,
            max: 10
        }
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isIP: true
        }
    },
    userAgent: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    metadata: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: database,
    tableName: 'Otp',
    timestamps: true,
    indexes: [
        {
            fields: ['email']
        },
        {
            fields: ['phone']
        },
        {
            fields: ['userId']
        },
        {
            fields: ['type']
        },
        {
            fields: ['expiryTime']
        },
        {
            fields: ['isUsed']
        },
        {
            unique: true,
            fields: ['otp', 'type', 'email', 'phone']
        }
    ],
    hooks: {
        beforeCreate: (otp: Otp) => {
            // Ensure either email, phone, or userId is provided
            if (!otp.email && !otp.phone && !otp.userId) {
                throw new Error('Either email, phone, or userId must be provided');
            }
        }
    }
});

// Define associations
Otp.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Otp, { foreignKey: 'userId', as: 'otps' });

export default Otp;
