import bcrypt from "bcryptjs";
import { sequelize } from "../config/db";
import fieldsBlogTag from "./blog_tag";
import fieldsBlog from "./blogs";
import fieldsComment from "./comments";
import fieldsTag from "./tags";
import fieldsUser from "./users";

sequelize
    .authenticate()
    .then(() => {
        console.log("connect db success!");
    })
    .catch((error) => {
        console.error(error);
        console.log("connect db fail!");
    });

const baseOption = {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
};

// Define all models
const BlogTag = sequelize.define("blog_tag", fieldsBlogTag, {
    ...baseOption,
    timestamps: false,
});
const Blogs = sequelize.define("blogs", fieldsBlog, baseOption);
const Comments = sequelize.define("comments", fieldsComment, baseOption);
const Tags = sequelize.define("tags", fieldsTag, baseOption);
const Users = sequelize.define("users", fieldsUser, baseOption);

// Association all models
Blogs.belongsToMany(Tags, {
    through: "blog_tag",
    foreignKey: "blog_id",
});
Tags.belongsToMany(Blogs, {
    through: "blog_tag",
    foreignKey: "tag_id",
});

Users.beforeCreate(async (user) => {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(user.password, salt);
    // Re-assign password hashed
    user.password = passwordHashed;
});

export { BlogTag, Blogs, Comments, Tags, Users };
