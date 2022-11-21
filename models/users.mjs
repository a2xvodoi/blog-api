import Sequelize from "sequelize";

export default {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.BOOLEAN,
    },
    avatar: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
        unique: true,
    },
    address: {
        type: Sequelize.STRING,
    },
    birthday: {
        type: Sequelize.DATE
    },
    describe: {
        type: Sequelize.STRING,
    },
    permissions: {
        type: Sequelize.SMALLINT,
        defaultValue: 0,
    },
    status: {
        type: Sequelize.SMALLINT,
        defaultValue: 1,
    },
    job: {
        type: Sequelize.STRING,
    },
    token: {
        type: Sequelize.STRING,
    },
    facebook_id: {
        type: Sequelize.STRING,
    },
    google_id: {
        type: Sequelize.STRING,
    },
    zalo_id: {
        type: Sequelize.STRING,
    },
    describe: {
        type: Sequelize.STRING,
    },
};
