import { Tags, Blogs } from "../../../models";
import {
    dataMapResponse,
    dataResponse,
    responseFailure,
    responseSuccess,
} from "../../../classes/response";
import constants from "../../../config/constants";

const TagController = {
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
            return res.send(responseFailure("", error));
        }
    },
};

export default TagController;
