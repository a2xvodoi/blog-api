import { Op } from "sequelize";
import { Blogs, BlogTag, Tags } from "../../../models/index.mjs";
import { blogValidator } from "../../../validations/blog";
import { responseFailure, responseSuccess } from "../../../classes/response.mjs";
import slugify from "../../../classes/slugify.mjs";
import { sequelize } from "../../../config/db.mjs";
import { base64Decode, unlink } from "../../../classes/helpers.mjs";
import logger from "../../../logs/winston.mjs";

const BlogController = {
    async show(req, res) {
        try {
            const blog = await Blogs.findOne({
                where: {
                    id: req.params.id,
                },
                include: {
                    model: Tags,
                },
            });
            return res.send(responseSuccess("", blog));
        } catch (err) {
            logger.error(err);
            return res.send(responseFailure("", { errors: err.message }));
        }
    },
    async store(req, res) {
        const { error } = blogValidator(req.body);

        const t = await sequelize.transaction();
        try {
            if (error) throw new Error(error.details[0].message);
            const existBlog = await Blogs.findOne({
                where: {
                    title: req.body.title,
                },
            });

            if (existBlog) throw new Error("Title field already exists!");
            let data = {
                title: req.body.title,
                slug: slugify(req.body.title),
                summary: req.body.summary,
                content: req.body.content,
                parent_id: req.body.parent_id,
                published: req.body.published,
                author_id: 1,
                published_at: req.body.published ? new Date() : null,
            };

            if (req.body.image) {
                const image = base64Decode(req.body.image);
                data = { ...data, image: image };
            }

            const blog = await Blogs.create(data, { transaction: t });

            const tags = req.body.tags.split(", ");
            for (let index = 0; index < tags.length; index++) {
                const element = tags[index];
                const tag = await Tags.findByPk(+element);
                if (!tag) {
                    throw new Error("Tag is not exists");
                }
                await BlogTag.create(
                    {
                        blog_id: blog.id,
                        tag_id: tag.id,
                    },
                    { transaction: t }
                );
            }
            await t.commit();

            return res.send(responseSuccess("", blog));
        } catch (err) {
            logger.error(err);
            await t.rollback();
            return res.send(responseFailure("", { errors: err.message }));
        }
    },
    async update(req, res) {
        const { error } = blogValidator(req.body);

        const t = await sequelize.transaction();
        try {
            if (error) throw new Error(error.details[0].message);
            const blog = await Blogs.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (!blog) {
                throw new Error("Blog not found!");
            }

            if (blog.title !== req.body.title) {
                blog.title = req.body.title;
                blog.slug = slugify(req.body.title);
            }
            blog.describe = req.body.describe;
            blog.content = req.body.content;
            blog.parent_id = req.body.parent_id;
            blog.published = req.body.published;

            if (!req.body.published) {
                blog.published_at = null;
            } else {
                if (!blog.published_at) {
                    blog.published_at = new Date();
                }
            }

            if (req.body.image && req.body.image !== blog.image) {
                unlink(blog.image);
                const image = base64Decode(req.body.image);
                blog.image = image;
            }

            blog.save({ transaction: t });

            const tags = req.body.tags.split(", ");
            for (let index = 0; index < tags.length; index++) {
                const element = tags[index];
                const tag = await Tags.findByPk(+element);
                if (!tag) {
                    throw new Error("Tag is not exists");
                }
                await BlogTag.findOrCreate({
                    where: { blog_id: blog.id, tag_id: tag.id },
                    transaction: t,
                });
                await BlogTag.destroy(
                    {
                        where: {
                            blog_id: blog.id,
                            tag_id: {
                                [Op.notIn]: tags,
                            },
                        },
                    },
                    { transaction: t }
                );
            }

            await t.commit();
            res.send(responseSuccess("", blog));
        } catch (err) {
            logger.error(err);
            await t.rollback();
            return res.send(responseFailure("", { errors: err.message }));
        }
    },
    async destroy(req, res) {
        try {
            const blog = await Blogs.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (!blog) {
                throw new Error("Blog not found!");
            }

            await blog.destroy();
            res.send(responseSuccess("Delete blog success!"));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
    async restore(req, res) {
        try {
            const blog = await Blogs.findOne({
                where: {
                    id: req.params.id,
                },
                paranoid: false,
            });

            if (!blog) {
                throw new Error("Blog not found!");
            }

            await blog.restore();
            res.send(responseSuccess("Restore blog success!"));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
};

export default BlogController;
