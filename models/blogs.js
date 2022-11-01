import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING,
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
};
