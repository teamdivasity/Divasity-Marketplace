"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Investment extends sequelize_1.Model {
}
Investment.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    projectId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    returnAmount: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: '0.00',
    },
    successRate: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0.0,
    },
}, {
    sequelize: database_1.database,
    modelName: 'Investment',
    tableName: 'Investments',
    timestamps: true,
});
exports.default = Investment;
