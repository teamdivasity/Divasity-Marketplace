"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Otp extends sequelize_1.Model {
}
exports.Otp = Otp;
Otp.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    otp_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    otp_expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: database_1.database,
    tableName: "Otp",
    timestamps: true,
});
exports.default = Otp;
