import { Tags, Blogs } from "../../../models/index.mjs";
import {
    dataMapResponse,
    dataResponse,
    responseFailure,
    responseSuccess,
} from "../../../classes/response.mjs";
import constants from "../../../config/constants.mjs";
import logger from "../../../logs/winston.mjs";

const BlogController = {
    async show(req, res) {
        try {
            const blog = await Blogs.findOne({
                where: {
                    published: constants.PUBLISHED,
                    slug: req.params.slug,
                },
                include: {
                    model: Tags,
                },
            });
            if (!blog) {
                return res.send(responseSuccess("", {}));
            }
            await blog.increment("viewed");
            await blog.reload();
            const response = {
                tags: dataMapResponse(blog.tags, [
                    "id",
                    "title",
                    "slug",
                    "image",
                    "describe",
                    "follow",
                    "parent_id",
                ]),
                blog: dataResponse(blog, [
                    "id",
                    "title",
                    "slug",
                    "viewed",
                    "image",
                    "summary",
                    "content",
                    "published",
                    "parent_id",
                    "author_id",
                    "published_at",
                ]),
            };
            return res.send(responseSuccess("", response));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
    async latest(req, res) {
        try {
            const blogs = await Blogs.findAll({
                attributes: ["id", "title", "slug", "image", "published_at"],
                where: {
                    published: constants.PUBLISHED,
                },
                order: [["published_at", "DESC"]],
                limit: 3,
            });
            return res.send(responseSuccess("", blogs));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
    async list(req, res) {
        try {
            const blogs = await Blogs.findAll({
                where: {
                    published: constants.PUBLISHED,
                },
                include: {
                    model: Tags,
                },
            });
            return res.send(responseSuccess("", blogs));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
};

export default BlogController;
