"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.role = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
var role;
(function (role) {
    role["ADMIN"] = "admin";
    role["USER"] = "user";
    role["INVESTOR"] = "investor";
})(role || (exports.role = role = {}));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(role)),
        allowNull: false,
        defaultValue: "user",
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    IsVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
    },
    // email_verified_at: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue: null,
    // }, 
}, {
    sequelize: database_1.database,
    tableName: "User",
    timestamps: true,
});
exports.default = User;
