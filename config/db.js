import Sequelize from "sequelize";
import configJson from "./json/config.json";

const env = process.env.NODE_ENV || "development";
const config = configJson[env];
const useENV = {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    timezone: "+07:00",
    query: {
        raw: true,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};

if (process.env.host) {
    var options = {
        database: useENV.database,
        username: useENV.username,
        password: useENV.password,
        ...useENV,
    };
} else {
    var options = {
        database: config.database,
        username: config.username,
        password: config.password,
        ...config,
    };
}
export const sequelize = new Sequelize(
    options.database,
    options.username,
    options.password,
    options
);
