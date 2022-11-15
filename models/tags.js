import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    image: {
        type: Sequelize.STRING,
    },
    describe: {
        type: Sequelize.STRING(100),
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
