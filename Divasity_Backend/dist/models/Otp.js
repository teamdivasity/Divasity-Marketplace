"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = exports.OtpType = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = require("./User");
var OtpType;
(function (OtpType) {
    OtpType["EMAIL_VERIFICATION"] = "email_verification";
    OtpType["PASSWORD_RESET"] = "password_reset";
    OtpType["LOGIN_VERIFICATION"] = "login_verification";
    OtpType["PHONE_VERIFICATION"] = "phone_verification";
    OtpType["TWO_FACTOR"] = "two_factor";
    OtpType["TRANSACTION_VERIFICATION"] = "transaction_verification";
})(OtpType || (exports.OtpType = OtpType = {}));
class Otp extends sequelize_1.Model {
    get isExpired() {
        return new Date() > this.expiryTime;
    }
    get isValid() {
        return !this.isUsed && !this.isExpired && this.attempts < this.maxAttempts;
    }
    get remainingAttempts() {
        return Math.max(0, this.maxAttempts - this.attempts);
    }
    get timeRemaining() {
        const now = new Date();
        const expiry = new Date(this.expiryTime);
        return Math.max(0, expiry.getTime() - now.getTime());
    }
    get timeRemainingMinutes() {
        return Math.floor(this.timeRemaining / (1000 * 60));
    }
    incrementAttempts() {
        return __awaiter(this, void 0, void 0, function* () {
            this.attempts += 1;
            yield this.save();
        });
    }
    markAsUsed() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isUsed = true;
            yield this.save();
        });
    }
    static generateOtp() {
        return __awaiter(this, arguments, void 0, function* (length = 6) {
            const digits = '0123456789';
            let otp = '';
            for (let i = 0; i < length; i++) {
                otp += digits[Math.floor(Math.random() * digits.length)];
            }
            return otp;
        });
    }
    static createOtp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = yield this.generateOtp();
            const expiryTime = new Date();
            expiryTime.setMinutes(expiryTime.getMinutes() + (data.expiryMinutes || 10));
            return yield this.create(Object.assign(Object.assign({}, data), { otp,
                expiryTime, metadata: data.metadata ? JSON.stringify(data.metadata) : undefined }));
        });
    }
    static verifyOtp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = {
                otp: data.otp,
                type: data.type,
                isUsed: false
            };
            if (data.email)
                whereClause.email = data.email;
            if (data.phone)
                whereClause.phone = data.phone;
            if (data.userId)
                whereClause.userId = data.userId;
            const otpRecord = yield this.findOne({ where: whereClause });
            if (!otpRecord) {
                return { success: false, message: 'Invalid OTP code' };
            }
            if (otpRecord.isExpired) {
                return { success: false, message: 'OTP code has expired' };
            }
            if (otpRecord.attempts >= otpRecord.maxAttempts) {
                return { success: false, message: 'Maximum attempts exceeded' };
            }
            yield otpRecord.markAsUsed();
            return { success: true, message: 'OTP verified successfully', otpRecord };
        });
    }
}
exports.Otp = Otp;
Otp.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[+]?[1-9]\d{1,14}$/
        }
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 8],
            isNumeric: true
        }
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(OtpType)),
        allowNull: false
    },
    expiryTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    isUsed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    attempts: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    maxAttempts: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
        validate: {
            min: 1,
            max: 10
        }
    },
    ipAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            isIP: true
        }
    },
    userAgent: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    metadata: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: database_1.database,
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
        beforeCreate: (otp) => {
            // Ensure either email, phone, or userId is provided
            if (!otp.email && !otp.phone && !otp.userId) {
                throw new Error('Either email, phone, or userId must be provided');
            }
        }
    }
});
// Define associations
Otp.belongsTo(User_1.User, { foreignKey: 'userId', as: 'user' });
User_1.User.hasMany(Otp, { foreignKey: 'userId', as: 'otps' });
exports.default = Otp;
