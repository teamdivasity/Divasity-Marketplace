"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = require("./User");
class News extends sequelize_1.Model {
    // Custom getters for array fields
    get linksArray() {
        return this.links ? JSON.parse(this.links) : null;
    }
    get categoriesArray() {
        return this.categories ? JSON.parse(this.categories) : null;
    }
}
exports.News = News;
News.init({
    Newsid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    UserId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },
    Newstitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Newsimage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    Newscontent: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    links: {
        type: sequelize_1.DataTypes.TEXT, // Changed from JSON to TEXT
        allowNull: true,
        defaultValue: null,
    },
    categories: {
        type: sequelize_1.DataTypes.TEXT, // Changed from ARRAY to TEXT
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: database_1.database,
    tableName: "News",
    timestamps: true,
});
News.belongsTo(User_1.User, { foreignKey: "UserId", as: "User" });
exports.default = News;
