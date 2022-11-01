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
    image: {
        type: Sequelize.STRING,
    },
    describe: {
        type: Sequelize.STRING,
    },
    follow: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
};
