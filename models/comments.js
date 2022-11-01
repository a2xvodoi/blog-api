import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
};
