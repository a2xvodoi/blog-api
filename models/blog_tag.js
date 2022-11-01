import Sequelize from "sequelize";

export default {
    blog_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
};
