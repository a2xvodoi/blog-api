import { Tags, Blogs } from "../../../models";
import {
    dataMapResponse,
    dataResponse,
    responseFailure,
    responseSuccess,
} from "../../../classes/response";
import constants from "../../../config/constants";

const TagController = {
    async list(req, res) {
        try {
            const tags = await Tags.findAll({});
            const response = dataMapResponse(tags, [
                "id",
                "name",
                "slug",
                "image",
                "describe",
                "interested",
                "parent_id",
            ]);
            return res.send(responseSuccess("", response));
        } catch (error) {
            return res.send(responseFailure("", error));
        }
    },
    async show(req, res) {
        try {
            const blogs = await Blogs.findAll({
                where: {
                    published: constants.PUBLISHED,
                },
                include: {
                    model: Tags,
                    where: {
                        slug: req.params.slug,
                    },
                },
            });
            const response = {
                tag: dataResponse(blogs[0].tags[0], [
                    "id",
                    "title",
                    "slug",
                    "image",
                    "describe",
                    "follow",
                    "parent_id",
                ]),
                blogs: dataMapResponse(blogs, [
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
            return res.send(responseFailure("", error));
        }
    },
};

export default TagController;
