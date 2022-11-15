"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("blogs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            viewed: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            image: {
                type: Sequelize.STRING,
            },
            summary: {
                type: Sequelize.STRING(100),
            },
            content: {
                type: Sequelize.TEXT,
            },
            published: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
            },
            parent_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            published_at: {
                type: Sequelize.DATE,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("blogs");
    },
};
