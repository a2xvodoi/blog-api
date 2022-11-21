import Sequelize from "sequelize";

const useENV = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    timezone: "+07:00",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};

// if (process.env.host) {
    var options = {
        database: useENV.database,
        username: useENV.username,
        password: useENV.password,
        ...useENV,
    };
// }
// else {
    // const env = process.env.NODE_ENV || "development";
    // const configJson = await import("./json/config.json");
    // const config = configJson.default[env];
    // var options = {
    //     database: config.database,
    //     username: config.username,
    //     password: config.password,
    //     ...config,
    // };
// }
export const sequelize = new Sequelize(
    options.database,
    options.username,
    options.password,
    options
);
