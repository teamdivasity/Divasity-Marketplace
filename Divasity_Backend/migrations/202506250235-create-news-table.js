'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('News', {
            Newsid: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            UserId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                },
                onDelete: 'CASCADE', // Delete news if associated user is deleted
                onUpdate: 'CASCADE'
            },
            Newstitle: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            Newsimage: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            Newscontent: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            links: {
                type: Sequelize.DataTypes.JSON,
                allowNull: true,
                defaultValue: null
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('News');
    }
};